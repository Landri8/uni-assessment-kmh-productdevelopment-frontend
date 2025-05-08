import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { logoutApi } from "../services/authService";
import ResponseModel from "../models/response.model";
import toast from "react-hot-toast";
import { httpResponseHandler } from "../utils/responseHandlerUtil";
import { MdDashboard, MdOutlineFeedback } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoCalendarOutline } from "react-icons/io5";


const AuthMiddleware = () => {
  const { authInfo, updateAuthInfo } = useAuthStore((state) => state);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!authInfo || Object.keys(authInfo).length === 0) {
      navigate("/admin/login");
    }
  }, [authInfo, navigate]);

  if (!authInfo || Object.keys(authInfo).length === 0) {
    return null; // Prevents rendering before redirection
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col h-screen fixed">
        {/* Logo Area */}
        <div className="px-6 py-8 border-b border-gray-100">
          <h1 className="text-lg font-bold text-green-600">
            {import.meta.env.VITE_APP_NAME}
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-1">
            <div className="mb-6 px-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                MAIN MENU
              </h3>
            </div>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-500"
                }`
              }
            >
              <MdDashboard className={`w-5 h-5`} />
              Dashboard
            </NavLink>
            
            {authInfo.user.role === "1" && (
              <>
                <NavLink
                  to="users"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-green-50 text-green-600 font-medium"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-500"
                    }`
                  }
                >
                  <LuUsers className="w-5 h-5" />
                  Manage Users
                </NavLink>
              </>
            )}

            <NavLink
                to="queries"
                className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors duration-200 ${
                    isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-500"
                }`
                }
            >
                <RxQuestionMarkCircled className="w-5 h-5" />
                Inquiries
            </NavLink>
            <NavLink
                to="events"
                className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors duration-200 ${
                    isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-500"
                }`
                }
            >
                <IoCalendarOutline className="w-5 h-5" />
                Events
            </NavLink>
            <NavLink
                to="feedbacks"
                className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors duration-200 ${
                    isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-500"
                }`
                }
            >
                <MdOutlineFeedback className="w-5 h-5" />
                Feedbacks
            </NavLink>
          </div>
        </nav>

        {/* User Profile Area */}
        <div className="border-t border-gray-100 mt-auto">
          <div className="p-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-semibold">
                {authInfo.user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-700">{authInfo.user.name}</div>
                <div className="text-xs text-gray-500 truncate">{authInfo.user.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-sm bg-green-50 text-green-600 hover:bg-green-100 transition-colors duration-200 font-medium rounded-lg"
            >
              <BiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthMiddleware;