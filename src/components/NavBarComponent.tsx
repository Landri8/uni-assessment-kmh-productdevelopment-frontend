import React from 'react'
import { Link } from 'react-router-dom'

const NavBarComponent: React.FC = () => {
  return (
    <header className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to={"/"} className="text-xl font-bold text-gray-900">AI Solution</Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link to={"/solutions"} className="text-base font-medium text-gray-700 hover:text-gray-900">
              Solutions
            </Link>
            <Link to={"/events"} className="text-base font-medium text-gray-700 hover:text-gray-900">
              Events
            </Link>
            <Link to={"/aboutus"} className="text-base font-medium text-gray-700 hover:text-gray-900">
              About Us
            </Link>
            <Link to={"/testimonials"} className="text-base font-medium text-gray-700 hover:text-gray-900">
              Testimonials
            </Link>
            <Link to={"/contactus"} className="text-base font-medium text-gray-700 hover:text-gray-900">
              Contact Us
            </Link>
          </nav>
          <div className="md:hidden">
            <button type="button" className="text-gray-500 hover:text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBarComponent