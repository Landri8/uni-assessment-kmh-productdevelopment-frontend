import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiAward, FiBriefcase, FiStar, FiUsers } from 'react-icons/fi';
import FooterComponent from '../components/FooterComponent';
import NavBarComponent from '../components/NavBarComponent';
import { Link } from 'react-router-dom';

function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBarComponent />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 flex content-center items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <div className="bg-black p-3 rounded-xl">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                AI-Powered Virtual Assistants for Your Business
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Streamline your operations and enhance productivity with our intelligent virtual assistant solutions. Custom-tailored for your specific business needs.
              </p>
              <div className="mt-10">
                <Link to={'/contactus'} className="bg-green-400 text-white font-bold px-6 py-3 rounded-full hover:bg-green-400 transition duration-300 mr-4">
                  Schedule Demo
                </Link>
                <Link to={'/aboutus'} className="bg-white text-gray-800 border border-gray-300 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">What Our AI Solutions Offer</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Our virtual assistants are designed to handle a variety of tasks, allowing you to focus on what matters most.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-4/12 px-4 text-center mb-10">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                <FiBriefcase className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold">Business Operations</h3>
              <p className="mt-2 mb-4 text-gray-600">
                Automate routine tasks, manage schedules, and streamline communications.
              </p>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center mb-10">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                <FiUsers className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold">Customer Service</h3>
              <p className="mt-2 mb-4 text-gray-600">
                Provide 24/7 customer support with intelligent responses and personalized interactions.
              </p>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center mb-10">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                <FiAward className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold">Data Analysis</h3>
              <p className="mt-2 mb-4 text-gray-600">
                Interpret complex data sets and generate actionable insights for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Trusted by Businesses Worldwide</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                See what our clients have to say about our AI solutions.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap">
            {/* Adjusted testimonials with equal height using flex and h-full */}
            <div className="w-full md:w-4/12 px-4 mb-8 flex">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "The AI virtual assistant has transformed how we handle customer inquiries. Response times are down by 80%, and customer satisfaction is up by 40%."
                  </p>
                </div>
                <div className="flex items-center mt-auto">
                  <img className='w-10 h-10 rounded-full mr-4' src="/assets/p1.jpg" alt="" />
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">CTO, TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-4/12 px-4 mb-8 flex">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "Implementing the AI solution has helped us automate our scheduling system completely, saving us countless hours and reducing errors."
                  </p>
                </div>
                <div className="flex items-center mt-auto">
                  <img className='w-10 h-10 rounded-full mr-4' src="/assets/p2.jpg" alt="" />
                  <div>
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-sm text-gray-600">Operations Manager, Globex</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-4/12 px-4 mb-8 flex">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "The data analysis capabilities of this AI system have given us insights we never would have discovered otherwise. A game-changer for our strategy."
                  </p>
                </div>
                <div className="flex items-center mt-auto">
                  <img className='w-10 h-10 rounded-full mr-4' src="/assets/p3.jpg" alt="" />
                  <div>
                    <h4 className="font-bold">Emma Rodriguez</h4>
                    <p className="text-sm text-gray-600">Data Analyst, Innovate Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-lg leading-relaxed mb-8 text-gray-600">
                Schedule a personalized demo today and see how our AI solutions can address your specific needs.
              </p>
              <Link to={'/contactus'} className="bg-green-400 text-white font-bold px-6 py-3 rounded-full hover:bg-green-400 transition duration-300 inline-flex items-center">
                Schedule Demo
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <FooterComponent />
    </div>
  );
}

export default App;