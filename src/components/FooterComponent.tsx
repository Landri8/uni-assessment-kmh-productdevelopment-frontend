import React from 'react';

const FooterComponent: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">AI Solution</h3>
            <p className="text-gray-600">
              Empowering businesses with intelligent AI assistants.
            </p>
            <p className="text-gray-600 mt-2">© AI Solution, 2023</p>
          </div>
          
          <div className="w-full md:w-1/4 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Business Assistant</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Customer Support AI</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Data Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Industry AI</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Resources</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Legal & Privacy</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Use</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">License Agreement</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Service Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;