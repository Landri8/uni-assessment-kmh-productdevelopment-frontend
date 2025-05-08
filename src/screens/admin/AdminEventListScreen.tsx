import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ResponseModel from "../../models/response.model";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import { deleteEventApi, getEventListApi } from "../../services/eventService";
import { EventModel } from "../../models/event.model";

const AdminEventListScreen: React.FC = () => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const eventsPerPage = 8;
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [eventDeleted, setEventDeleted] = useState(0);

  const navigate = useNavigate();

  // Fetch event list from API on component mount
  useEffect(() => {
    setIsLoading(true);
    getEventListApi()
      .then(({ data }: { data: ResponseModel }) => {
        const eventListResponse = httpResponseHandler(data);
        setEvents(eventListResponse);
        setFilteredEvents(eventListResponse);
      })
      .catch((error) => toast.error("Fetching event list failed"))
      .finally(() => setIsLoading(false));
  }, [eventDeleted]);

  // Filter events when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEvents(events);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(lowerCaseQuery) ||
          event.type.toLowerCase().includes(lowerCaseQuery) ||
          event.location.toLowerCase().includes(lowerCaseQuery) ||
          event.id.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredEvents(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, events]);

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Navigate to event details
  const handleEventClick = (event: EventModel) => {
    navigate(`${event.id}`);
  };

  // Helper function to get event type name
  const getEventTypeName = (type: string): string => {
    const typeName = type.charAt(0).toUpperCase() + type.slice(1);
    return typeName;
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { data: responseData }: { data: ResponseModel } =
        await deleteEventApi({
          id: selectedEvent?.id || "",
        });

      const deleteResponseData = httpResponseHandler(responseData);
      toast.success("Event deleted successfully");
      setEventDeleted((prev) => prev + 1);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
      setShowDeleteConfirm(false);
      setSelectedEvent(null);
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return "Invalid date";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Search */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
          Event Management
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search events"
              className="w-full py-2 px-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all border border-gray-200"
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

          <button
            onClick={() => navigate("/admin/events/create")}
            className="bg-green-400 hover:bg-green-500 text-white py-2.5 px-5 rounded-lg flex items-center shadow-sm transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Event
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-100 border-t-green-400"></div>
        </div>
      ) : (
        <>
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
                      Event ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
                      <tr
                        key={event.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded-md">
                            {event.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {event.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              event.type === "conference"
                                ? "bg-purple-100 text-purple-800"
                                : event.type === "workshop"
                                ? "bg-green-100 text-green-800" 
                                : event.type === "seminar"
                                ? "bg-blue-100 text-blue-800"
                                : event.type === "meetup"
                                ? "bg-yellow-100 text-yellow-800"
                                : event.type === "webinar"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {getEventTypeName(event.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 text-gray-400 mr-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                              />
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                              />
                            </svg>
                            {event.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(event.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEventClick(event)}
                              className="text-green-500 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setShowDeleteConfirm(true);
                                setSelectedEvent(event);
                              }}
                              className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                            >
                              Delete
                            </button>
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p>No events found</p>
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
            <div className="px-6 py-4 flex justify-end items-center border-t border-gray-200">
              {filteredEvents.length > 0 && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-4">
                    Showing {indexOfFirstEvent + 1} to{" "}
                    {Math.min(indexOfLastEvent, filteredEvents.length)} of{" "}
                    {filteredEvents.length} events
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-[#0233002c] filter backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl transform transition-all max-w-lg w-full">
            <div className="bg-white px-6 pt-6 pb-4 rounded-t-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Delete Event
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete{" "}
                      <span className="font-medium text-gray-700">
                        {selectedEvent?.title}
                      </span>
                      ? All data will be permanently removed. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-xl">
              <button
                type="button"
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedEvent(null);
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete Event"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventListScreen;