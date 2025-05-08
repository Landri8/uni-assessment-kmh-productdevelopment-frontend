import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ResponseModel from "../../models/response.model";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import { deleteFeedbackApi, getFeedbackListApi } from "../../services/feedbackService";
import FeedbackInfoModel from "../../models/feedback.model";

const AdminFeedbackListScreen: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackInfoModel[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<FeedbackInfoModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackDeleted, setFeedbackDeleted] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackInfoModel | null>(null);

  const navigate = useNavigate();

  // Fetch feedback list from API on component mount
  useEffect(() => {
    setIsLoading(true);
    getFeedbackListApi()
      .then(({ data }: { data: ResponseModel }) => {
        const feedbackListResponse = httpResponseHandler(data);
        setFeedbacks(feedbackListResponse);
        setFilteredFeedbacks(feedbackListResponse);
      })
      .catch((error) => toast.error("Fetching feedback list failed"))
      .finally(() => setIsLoading(false));
  }, [feedbackDeleted]);

  // Filter feedbacks when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFeedbacks(feedbacks);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = feedbacks.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(lowerCaseQuery) ||
          feedback.company.toLowerCase().includes(lowerCaseQuery) ||
          feedback.feedback.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredFeedbacks(filtered);
    }
  }, [searchQuery, feedbacks]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Format date helper
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return "Invalid date";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { data: responseData }: { data: ResponseModel } =
        await deleteFeedbackApi({
          id: selectedFeedback?.id || "",
        });

      const deleteResponseData = httpResponseHandler(responseData);
      toast.success("Feedback deleted successfully");
      setFeedbackDeleted((prev) => prev + 1);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Failed to delete feedback");
      setShowDeleteConfirm(false);
      setSelectedFeedback(null);
    } finally {
      setIsDeleting(false);
    }
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Search */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
          Customer Feedback
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search feedback"
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
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-100 border-t-green-400"></div>
        </div>
      ) : (
        <>
          {filteredFeedbacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg mr-3">
                          {feedback.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {feedback.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {feedback.role}, {feedback.company}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedFeedback(feedback);
                          setShowDeleteConfirm(true);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete feedback"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="mb-4">
                      {renderStars(feedback.rating)}
                    </div>

                    <blockquote className="text-gray-700 italic border-l-4 border-green-300 pl-4 py-1 mb-4 flex-1">
                      "{feedback.feedback}"
                    </blockquote>

                    <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1.5"
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
                        <span>
                          {formatDate(feedback.createdAt)}
                        </span>
                      </div>
                      <div
                        className="bg-gray-100 rounded-full px-2 py-1 text-xs"
                        title="Feedback ID"
                      >
                        ID: {feedback.id.substring(0, 8)}...
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-300 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No feedback found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "Try adjusting your search criteria"
                  : "No customer feedback has been submitted yet"}
              </p>
            </div>
          )}
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
                    Delete Feedback
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete feedback from{" "}
                      <span className="font-medium text-gray-700">
                        {selectedFeedback?.name}
                      </span>
                      ? This action cannot be undone.
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
                  setSelectedFeedback(null);
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
                  "Delete Feedback"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackListScreen;