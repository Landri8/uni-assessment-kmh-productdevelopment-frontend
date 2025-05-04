import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const AdminWelcomeScreen = () => {
  const authStore = useAuthStore(state => state);
  const user = authStore.authInfo?.user;
  
  // Get current time to personalize greeting
  const hours = new Date().getHours();
  let greeting = "Good morning";
  if (hours >= 12 && hours < 17) greeting = "Good afternoon";
  if (hours >= 17 || hours < 5) greeting = "Good evening";

  // Define quick action cards based on user role
  const quickActions = [
    {
      title: "Manage Messages",
      description: "View and respond to customer inquiries",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      link: "/admin/queries"
    },
    {
      title: "View Statistics",
      description: "Access dashboard analytics and reports",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: "/admin/dashboard"
    },
    ...(user?.role === "1" ? [
      {
        title: "Manage Users",
        description: "Add, edit or delete system users",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        link: "/admin/users"
      }
    ] : [])
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-1">
            <span className="text-sm text-gray-500">{greeting},</span>
            <h1 className="text-3xl font-bold mb-3 text-gray-800">
              Welcome back, {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 max-w-2xl">
              This is the AI Solution's admin dashboard. Here you can manage work according to your roles and responsibilities.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <div className="bg-green-400 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Link 
            to={action.link}
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-green-200 transition-all flex flex-col h-full"
          >
            <div className="p-3 rounded-lg bg-gray-50 w-fit mb-4">
              {action.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{action.description}</p>
            <div className="mt-auto text-green-500 font-medium text-sm flex items-center">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Help Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
        Help & Support
      </h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Assistance?</h3>
            <p className="text-gray-600 mb-4">
              If you're not familiar with the dashboard or need help with any tasks, our support team is ready to assist.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Support</p>
                  <a href="tel:+959771241245" className="text-green-600 font-medium hover:text-green-700">+959 7712 41245</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Support</p>
                  <a href="mailto:support@aisolutions.com" className="text-green-600 font-medium hover:text-green-700">support@aisolutions.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tips & Guidelines */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></span>
        Tips & Guidelines
      </h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex">
            <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700 font-bold mr-4 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Regular Check-ins</h3>
              <p className="text-sm text-gray-600">Make it a habit to check the dashboard regularly for new customer inquiries or system updates.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700 font-bold mr-4 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Prompt Responses</h3>
              <p className="text-sm text-gray-600">Try to respond to customer messages within 24 hours to maintain good customer service.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700 font-bold mr-4 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Export Data Regularly</h3>
              <p className="text-sm text-gray-600">Use the export feature to backup important data and create reports for team meetings.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700 font-bold mr-4 flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Team Collaboration</h3>
              <p className="text-sm text-gray-600">For complex inquiries, consult with team members to provide the most accurate responses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcomeScreen;