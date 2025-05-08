import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ResponseModel from "../../models/response.model";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import {
  EventCreationFormData,
  EventCreationFormSchema,
} from "../../schemas/EventCreationFormSchema";
import { createEventApi } from "../../services/eventService";

const AdminEventCreationScreen: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventCreationFormData>({
    resolver: zodResolver(EventCreationFormSchema),
    defaultValues: {
      title: "",
      type: "",
      location: "",
      presenter: "",
      timeRange: "",
      date: "",
      eventDesc: "",
    },
  });

  const onSubmit = async (data: EventCreationFormData) => {
    try {
      setIsSubmitting(true);
      
      // Format date to YYYYMMDD
      if (data.date) {
        const dateObj = new Date(data.date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        data.date = `${year}${month}${day}`;
      }

      const { data: responseData }: { data: ResponseModel } =
        await createEventApi(data);

      const createResponseData = httpResponseHandler(responseData);

      toast.success(responseData.message);
      reset();
      navigate("/admin/events");
    } catch (error: Error | any) {
      console.error("Error creating event:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Link
            to="/admin/events"
            className="mr-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
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
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
            Create New Event
          </h1>
        </div>
        <p className="text-gray-600 ml-11">Add a new event to the system</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className={`w-full px-4 py-2.5 border rounded-lg ${
                errors.title
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Type Selection */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="type"
                {...register("type")}
                className={`w-full px-4 py-2.5 border rounded-lg appearance-none bg-white ${
                  errors.type
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
              >
                <option value="">Select event type</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="meetup">Meetup</option>
                <option value="webinar">Webinar</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
            {errors.type && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.type.message}
              </p>
            )}
          </div>

          {/* Location Field */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              {...register("location")}
              className={`w-full px-4 py-2.5 border rounded-lg ${
                errors.location
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
              placeholder="Enter event location"
            />
            {errors.location && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Presenter Field */}
          <div>
            <label
              htmlFor="presenter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Presenter <span className="text-red-500">*</span>
            </label>
            <input
              id="presenter"
              type="text"
              {...register("presenter")}
              className={`w-full px-4 py-2.5 border rounded-lg ${
                errors.presenter
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
              placeholder="Enter presenter name"
            />
            {errors.presenter && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.presenter.message}
              </p>
            )}
          </div>

          {/* Date Picker */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className={`w-full px-4 py-2.5 border rounded-lg ${
                errors.date
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
            />
            {errors.date && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Time Range Field */}
          <div>
            <label
              htmlFor="timeRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time Range <span className="text-red-500">*</span>
            </label>
            <input
              id="timeRange"
              type="text"
              {...register("timeRange")}
              className={`w-full px-4 py-2.5 border rounded-lg ${
                errors.timeRange
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
              placeholder="e.g., 10:00 AM - 2:00 PM"
            />
            {errors.timeRange && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.timeRange.message}
              </p>
            )}
          </div>

          {/* Event Description Field */}
          <div>
            <label
              htmlFor="eventDesc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="eventDesc"
              {...register("eventDesc")}
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-lg ${
                errors.eventDesc
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
              placeholder="Enter event description"
            ></textarea>
            {errors.eventDesc && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.eventDesc.message}
              </p>
            )}
            <p className="mt-1.5 text-xs text-gray-500">
              Maximum 500 characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-green-400 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center">
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
                  Creating...
                </span>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEventCreationScreen;