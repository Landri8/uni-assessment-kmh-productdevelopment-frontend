import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ResponseModel from "../../models/response.model";
import { MessageInfoModel } from "../../models/messageInfo.model";
import { getMessageListApi } from "../../services/messageService";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import * as XLSX from "xlsx";
import { formatJoinedDate, formatTimestamp } from "../../utils/commonUtil";
import { useAuthStore } from "../../store/authStore";
import { logoutApi } from "../../services/authService";

const EXTENSION = ".xlsx";

const AdminCustomerQueriesListScreen: React.FC = () => {
  const [messages, setMessages] = useState<MessageInfoModel[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<MessageInfoModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesPerPage = 8;

  const navigate = useNavigate();
  const { authInfo, updateAuthInfo } = useAuthStore((state) => state);

  // Fetch message list from API on component mount
  useEffect(() => {
    setIsLoading(true);
    getMessageListApi()
      .then(({ data }: { data: ResponseModel }) => {
        const messageListResponse = httpResponseHandler(data);
        setMessages(messageListResponse);
        setFilteredMessages(messageListResponse);
      })
      .catch((error) => toast.error("Fetching message list failed"))
      .finally(() => setIsLoading(false));
  }, []);

  // Filter messages when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMessages(messages);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = messages.filter(
        (message) =>
          `${message.firstName} ${message.lastName}`
            .toLowerCase()
            .includes(lowerCaseQuery) ||
          message.email.toLowerCase().includes(lowerCaseQuery) ||
          message.companyName.toLowerCase().includes(lowerCaseQuery) ||
          message.country.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredMessages(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, messages]);

  // Get current messages for pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleLogout = async () => {
    try {
      const { data }: { data: ResponseModel } = await logoutApi({
        id: authInfo?.user.id || "",
        email: authInfo?.user.email || "",
      });

      const logoutResponseData = httpResponseHandler(data);
      updateAuthInfo(null);
      navigate("/admin/login");
    } catch (e) {
      toast.error("Error logging out");
    }
  };

  // Export to excel (mock function)
  const exportToExcel = () => {
    const formattedDataForExcel = messages.map(
      (message: MessageInfoModel, index) => ({
        "#": index + 1,
        Name: message.firstName + " " + message.lastName,
        Email: message.email,
        "Company Name": message.companyName,
        Country: message.country,
        Phone: message.phone,
        "Sent At": formatJoinedDate(message.createdAt),
        "Job Title": message.jobTitle,
        "Job Details": message.jobDetails,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet([]);

    const reportTitle = `Customer Inquiries Report (${formatJoinedDate(
      formatTimestamp()
    )})`;
    XLSX.utils.sheet_add_aoa(worksheet, [[reportTitle]], { origin: "A1" });

    XLSX.utils.sheet_add_json(worksheet, formattedDataForExcel, {
      origin: "A2",
      skipHeader: false,
    });

    const colCount = Object.keys(formattedDataForExcel[0]).length;
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } },
    ];

    const columnWidths = [
      { wch: 5 }, // "#"
      { wch: 20 }, // "Full Name"
      { wch: 35 }, // "Email"
      { wch: 30 }, // "Company Name"
      { wch: 20 }, // "Country"
      { wch: 20 }, // "Phone"
      { wch: 20 }, // "Sent At"
      { wch: 40 },
      { wch: 50 },
    ];

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");

    // Generate file
    XLSX.writeFile(
      workbook,
      `${formatTimestamp()}_customer_inquiries${EXTENSION}`
    );
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Navigate to message details
  const handleMessageClick = (message: MessageInfoModel) => {
    navigate(`${message.id}`);
  };

  // Get full name function
  const getFullName = (message: MessageInfoModel) => {
    return `${message.firstName} ${message.lastName}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Search */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
          Manage Customer Queries
        </h1>

        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search messages"
            className="w-full py-2.5 px-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all border border-gray-200"
            value={searchQuery}
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-100 border-t-green-400"></div>
        </div>
      ) : (
        <>
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Queries</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {filteredMessages.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Unread Messages</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {filteredMessages.filter((m) => !m.read).length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Countries</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {new Set(filteredMessages.map((m) => m.country)).size}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Companies</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {new Set(filteredMessages.map((m) => m.companyName)).size}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="w-full overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMessages.length > 0 ? (
                    currentMessages.map((message, index) => (
                      <tr
                        onClick={() => handleMessageClick(message)}
                        key={message.id}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                          !message.read ? "bg-green-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {indexOfFirstMessage + index + 1}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            !message.read
                              ? "font-bold text-gray-900"
                              : "font-medium text-gray-900"
                          }`}
                        >
                          <div className="flex items-center">
                            {!message.read && (
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            )}
                            <span className="text-sm">
                              {getFullName(message)}
                            </span>
                          </div>
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            !message.read
                              ? "font-bold text-gray-800"
                              : "text-gray-500"
                          }`}
                        >
                          {message.email}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            !message.read
                              ? "font-bold text-gray-800"
                              : "text-gray-500"
                          }`}
                        >
                          {message.phone}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            !message.read
                              ? "font-bold text-gray-800"
                              : "text-gray-500"
                          }`}
                        >
                          {message.companyName}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            !message.read
                              ? "font-bold text-gray-800"
                              : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="inline-block w-4 h-3 mr-2 bg-gray-200 rounded-sm"></span>
                            {message.country}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-gray-300 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                          <p>No messages found</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer / Pagination */}
            <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
              <button
                onClick={exportToExcel}
                className="flex items-center bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors shadow-sm"
              >
                Export to Excel
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>

              {filteredMessages.length > 0 && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-4">
                    Showing {indexOfFirstMessage + 1} to{" "}
                    {Math.min(indexOfLastMessage, filteredMessages.length)} of{" "}
                    {filteredMessages.length} messages
                  </span>

                  <nav className="flex items-center">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }).map(
                      (_, idx) => {
                        let pageNum: number;

                        // Logic for showing pages around current page
                        if (totalPages <= 5) {
                          pageNum = idx + 1;
                        } else if (currentPage <= 3) {
                          pageNum = idx + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + idx;
                        } else {
                          pageNum = currentPage - 2 + idx;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            className={`w-9 h-9 mx-1 flex items-center justify-center rounded-md transition-colors ${
                              currentPage === pageNum
                                ? "bg-green-400 text-white shadow-sm"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCustomerQueriesListScreen;
