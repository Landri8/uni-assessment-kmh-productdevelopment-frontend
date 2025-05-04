import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getMessageDetailsApi,
  sendReplyApi,
  updateMessageToMarkReadApi,
} from "../../services/messageService";
import ResponseModel from "../../models/response.model";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import MessageInfoModel from "../../models/messageInfo.model";
import toast from "react-hot-toast";
import { formatJoinedDate } from "../../utils/commonUtil";
import { useAuthStore } from "../../store/authStore";

const AdminCustomerQueryDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const authInfo = useAuthStore((state) => state.authInfo);
  const { id } = useParams<{ id: string }>();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  // Refs for auto-focus and scrolling
  const [isLoading, setIsLoading] = useState(false);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const replyFormRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState<MessageInfoModel | null>(null);

  const handleMarkAsRead = async () => {
    try {
      const { data: responseData }: { data: ResponseModel } =
        await updateMessageToMarkReadApi({ id: id || "" });
      const markedMessageResponseData = httpResponseHandler(responseData);

      toast.success("Marked as read successfully");
      setMessage(markedMessageResponseData);
    } catch (e) {
      toast.error("Failed updating message");
      console.log(e);
    }
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText("");
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsReplying(true);
    toast.loading("Replying...");
    try {
      const { data: responseData }: { data: ResponseModel } =
        await sendReplyApi({ messageId: id || "", replyText: replyText });
      const sendResponseData = httpResponseHandler(responseData);
      toast.remove();
      toast.success(responseData.message);
      navigate("/admin/queries");
    } catch (e) {
      toast.remove();
      toast.error("Failed sending reply");
      throw e;
    } finally {
      setIsReplying(false);
    }
  };

  // Effect for auto-focus and scrolling when reply form is opened
  useEffect(() => {
    if (isReplying && replyTextareaRef.current && replyFormRef.current) {
      // Focus on the textarea
      replyTextareaRef.current.focus();

      // Scroll to the reply form
      replyFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isReplying]);

  useEffect(() => {
    setIsLoading(true);
    getMessageDetailsApi(id || "")
      .then(({ data }: { data: ResponseModel }) => {
        const getMessageInfoResponseData = httpResponseHandler(data);
        setMessage(getMessageInfoResponseData);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error("Fetching question details failed");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-100 border-t-green-400"></div>
        </div>
      ) : (
        <>
          {/* Header with Back Button and Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
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
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
                  Message Details
                </h1>
                <p className="text-gray-500 ml-4 text-sm">
                  {message?.createdAt
                    ? formatJoinedDate(message?.createdAt)
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleReply}
                disabled={isReplying}
                className={`flex items-center ${
                  isReplying
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-400 hover:bg-green-500"
                } text-white px-4 py-2.5 rounded-lg transition-colors shadow-sm`}
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
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply
              </button>

              {message?.read ? (
                <button
                  disabled
                  className="flex items-center bg-gray-200 text-gray-500 px-4 py-2.5 rounded-lg disabled:opacity-70"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Read
                </button>
              ) : (
                <button
                  onClick={handleMarkAsRead}
                  className="flex items-center bg-gray-600 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
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
                      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                    />
                  </svg>
                  Mark as read
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Message Content */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Message Title */}
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {message?.jobTitle}
                  </h2>
                </div>

                {/* Message Body */}
                <div className="p-6">
                  <div className="prose max-w-none mb-6">
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {message?.jobDetails}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              {isReplying && (
                <div
                  ref={replyFormRef}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6 transition-all animate-fadeIn"
                >
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-semibold text-gray-800">
                      Reply to {message?.firstName} {message?.lastName}
                    </h2>
                  </div>

                  <div className="p-6">
                    <form onSubmit={handleSubmitReply}>
                      <div className="mb-4">
                        <textarea
                          ref={replyTextareaRef}
                          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                          rows={8}
                          placeholder="Type your reply here..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={handleCancelReply}
                          className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-green-400 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors shadow-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          Send Reply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h2 className="font-semibold text-gray-800">
                    Contact Information
                  </h2>
                </div>

                <div className="p-6">
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Full Name
                        </div>
                        <div className="font-medium text-gray-800">
                          {message?.firstName} {message?.lastName}
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3 mt-0.5"
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
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Email Address
                        </div>
                        <a
                          href={`mailto:${message?.email}`}
                          className="font-medium text-green-600 hover:underline"
                        >
                          {message?.email}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Phone Number
                        </div>
                        <a
                          href={`tel:${message?.phone}`}
                          className="font-medium text-gray-800"
                        >
                          {message?.phone}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3 mt-0.5"
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
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Company Name
                        </div>
                        <div className="font-medium text-gray-800">
                          {message?.companyName}
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3 mt-0.5"
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
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Country
                        </div>
                        <div className="font-medium text-gray-800">
                          {message?.country}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add animation for reply form */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminCustomerQueryDetailsScreen;
