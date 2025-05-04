import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserUpdateFormData,
  userUpdateFormSchema,
} from "../../schemas/UserUpdateFormSchema";
import {
  deleteUserApi,
  getUserDetailsApi,
  updateUserApi,
} from "../../services/userService";
import ResponseModel from "../../models/response.model";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import { useAuthStore } from "../../store/authStore";
import { logoutApi } from "../../services/authService";

const AdminUserDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { authInfo, updateAuthInfo } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateFormSchema),
  });

  // Format date helper
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return "Invalid date";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${day}/${month}/${year}`;
  };

  // Get role name helper
  const getRoleName = (roleId: string): string => {
    switch (roleId) {
      case "1":
        return "Admin";
      case "2":
        return "Staff";
      default:
        return "Unknown";
    }
  };

  // Fetch user data
  useEffect(() => {
    if (!id) {
      navigate("/admin/users");
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);

      getUserDetailsApi(id)
        .then(({ data }: { data: ResponseModel }) => {
          const getUserDetailsResponseData = httpResponseHandler(data);

          setValue("name", getUserDetailsResponseData.name);
          setValue("email", getUserDetailsResponseData.email);
          setValue("role", getUserDetailsResponseData.role);
        })
        .catch((error: any) => {
          console.log(error);
          toast.error("Failed to load user data");
          navigate("/admin/users");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchUser();
  }, [id, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data: UserUpdateFormData) => {
    try {
      setIsSubmitting(true);

      const updateData = {
        name: data.name,
        email: data.email,
        role: data.role,
      };

      const { data: responseData }: { data: ResponseModel } =
        await updateUserApi(updateData);
      console.log(responseData);
      const updateResponseData = httpResponseHandler(responseData);
      toast.success(responseData.message);
      reset();
      navigate("/admin/users");
    } catch (error: Error | any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { data: responseData }: { data: ResponseModel } =
        await deleteUserApi({
          id: id || "",
        });

      const deleteResponseData = httpResponseHandler(responseData);
      toast.success("User deleted successfully");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Main Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-100 border-t-green-400"></div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link
                  to="/admin/users"
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
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
                    User Details
                  </h1>
                  <p className="text-gray-600 ml-4">
                    View and manage user information
                  </p>
                </div>
              </div>

              {authInfo?.user.id != id && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1.5"
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
                  Delete User
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* User ID and Created Date (non-editable) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={id}
                      disabled
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(id);
                        toast.success("ID copied to clipboard");
                      }}
                      className="ml-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                      title="Copy ID"
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
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Created Date
                  </label>
                  <input
                    type="text"
                    value="24/02/2025" // This would be formatDate(user.createdAt) with real data
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-2.5 border rounded-lg ${
                    errors.name
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
                />
                {errors.name && (
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
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full px-4 py-2.5 border rounded-lg ${
                    errors.email
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all`}
                />
                {errors.email && (
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
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="role"
                    {...register("role")}
                    className={`w-full px-4 py-2.5 border rounded-lg appearance-none ${
                      errors.role
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-white`}
                  >
                    <option value="2">Staff</option>
                    <option value="1">Admin</option>
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
                {errors.role && (
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
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <Link
                  to="/admin/users"
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
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
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
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
                    Delete User
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this user? All data will
                      be permanently removed. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-xl">
              <button
                type="button"
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
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
                  "Delete User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetailsScreen;
