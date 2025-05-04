import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMessageStatisticsApi } from "../../services/messageService";
import ResponseModel from "../../models/response.model";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import { MessageModel } from "../../models/messageInfo.model";
import { formatJoinedDate } from "../../utils/commonUtil";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboardScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [readUnreadCounts, setReadUnreadCounts] = useState({read: 0, unread: 0});

  const [pieChartData, setPieChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [lastMessagesData, setLastMessagesData] = useState([]);

  const navigator = useNavigate();

  const handleClickDetails = (id: string) => {
    if (id == null || id == "") return;

    navigator(`/admin/messages/${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    getMessageStatisticsApi()
      .then(({ data }: { data: ResponseModel }) => {
        const getMessageStatisticsResponseData = httpResponseHandler(data);
        console.log(getMessageStatisticsResponseData);

        const readUnreadData = getMessageStatisticsResponseData?.readUnreadCounts;
        const monthlyCountData = getMessageStatisticsResponseData?.monthlyCounts;
        const lastMessagesData = getMessageStatisticsResponseData?.latestMessages;

        setReadUnreadCounts(readUnreadData);

        setPieChartData({
          labels: ["Read", "Unread"],
          datasets: [
            {
              label: "Read vs Unread",
              data: [readUnreadData?.read, readUnreadData?.unread],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        });

        setBarChartData({
          labels: Object.keys(monthlyCountData),
          datasets: [
            {
              label: "Monthly enquiries",
              data: Object.values(monthlyCountData),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });

        setLastMessagesData(lastMessagesData);
      })
      .catch((error) => toast.error("Fetching user list failed"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    isLoading ? (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    ) : (
      <div className="bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-green-400 w-2 h-8 rounded mr-3"></span>
            Dashboard Overview
          </h1>
  
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 transition-all hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Enquiries</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{readUnreadCounts?.read + readUnreadCounts?.unread}</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 transition-all hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Unread Messages</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{readUnreadCounts?.unread}</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 transition-all hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Average Response</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">1h</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 transition-all hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Resolution Rate</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">95%</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
  
          {/* Charts row */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex-1 transition-all hover:shadow-md hover:border-green-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-1.5 h-5 bg-green-400 rounded mr-2"></span>
                Read and Unread
              </h2>
              <div className="h-64">
                <Pie
                  data={{
                    ...pieChartData,
                    datasets: [
                      {
                        ...pieChartData.datasets[0],
                        backgroundColor: ['rgba(74, 222, 128, 0.8)', 'rgba(239, 68, 68, 0.7)'],
                        borderColor: ['rgb(74, 222, 128)', 'rgb(239, 68, 68)'],
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          usePointStyle: true,
                          padding: 15
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
  
            {/* Bar Chart */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex-1 transition-all hover:shadow-md hover:border-green-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-1.5 h-5 bg-green-400 rounded mr-2"></span>
                Monthly Enquiries
              </h2>
              <div className="h-64">
                <Bar
                  data={{
                    ...barChartData,
                    datasets: [
                      {
                        ...barChartData.datasets[0],
                        backgroundColor: 'rgba(74, 222, 128, 0.7)',
                        borderColor: 'rgb(74, 222, 128)',
                        borderWidth: 1,
                        borderRadius: 4
                      }
                    ]
                  }}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
  
          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 transition-all hover:shadow-md hover:border-green-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-1.5 h-5 bg-green-400 rounded mr-2"></span>
              Recent enquiries
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-b-gray-200">
                    <th className="py-3 px-4 text-sm font-medium text-gray-600 text-end w-1/12">
                      No.
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600 text-end w-2/12">
                      ID
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600 w-2/12 text-start">
                      Company
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600 w-2/12 text-start">
                      Email
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600 w-3/12 text-start">
                      Name
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600 text-end w-2/12">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="py-3 text-center">
                        <span className="loader"></span>
                      </td>
                    </tr>
                  ) : lastMessagesData.length > 0 ? (
                    lastMessagesData.map((message : MessageModel, index) => (
                      <tr
                        className={`${
                          index != lastMessagesData.length - 1 && "border-b"
                        } border-b-gray-200 ${!message.read ? "bg-green-50" : "hover:bg-gray-50"} transition-colors`}
                        key={index}
                      >
                        <td
                          className={`py-3 px-4 text-sm ${
                            !message.read ? "font-bold" : "font-normal"
                          } text-gray-600 text-end w-1/12`}
                        >
                          {index + 1}
                        </td>
                        <td
                          onClick={() => handleClickDetails(message.id)}
                          className={`py-3 px-4 text-sm ${
                            !message.read ? "font-bold" : "font-normal"
                          } cursor-pointer text-green-600 text-end w-2/12 hover:underline`}
                        >
                          {message.id}
                        </td>
                        <td
                          className={`py-3 px-4 text-sm ${
                            !message.read ? "font-bold" : "font-normal"
                          } text-gray-700 w-2/12`}
                        >
                          {message.companyName}
                        </td>
                        <td
                          className={`py-3 px-4 text-sm ${
                            !message.read ? "font-bold" : "font-normal"
                          } text-gray-600 w-2/12`}
                        >
                          {message.email}
                        </td>
                        <td
                          className={`py-3 px-4 text-sm ${
                            !message.read ? "font-bold" : "font-normal"
                          } text-gray-700 w-2/12`}
                        >
                          {message.firstName + " " + message.lastName}
                          {!message.read && (
                            <span className="inline-flex ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              New
                            </span>
                          )}
                        </td>
                        <td
                          className={`py-3 px-4 text-sm ${
                            !message.read ? "font-bold" : "font-normal"
                          } text-gray-600 text-end w-1/12`}
                        >
                          {formatJoinedDate(message.createdAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="">
                      <td
                        className="py-6 text-sm text-gray-500 text-center bg-gray-50"
                        colSpan={6}
                      >
                        No message data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminDashboardScreen;