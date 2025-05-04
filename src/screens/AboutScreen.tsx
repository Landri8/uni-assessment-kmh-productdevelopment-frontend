import React, { useEffect } from 'react'
import FooterComponent from '../components/FooterComponent';
import NavBarComponent from '../components/NavBarComponent';
import { FiAward, FiClock, FiCodepen, FiCompass, FiTarget, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AboutScreen = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavBarComponent />
      
      {/* Hero Section */}
      <div className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <h1 className="text-5xl font-bold leading-tight text-gray-900 mb-6">
                About AI Solution
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're on a mission to transform business operations through the power of artificial intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 px-4 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2018, AI Solution emerged from a simple observation: businesses were drowning in routine tasks that could be automated with the right technology. Our founders, a team of AI specialists and business consultants, set out to create virtual assistants that would truly understand and adapt to each organization's unique needs.
              </p>
              <p className="text-gray-600 mb-4">
                What began as a startup with five employees has now grown into a global company serving businesses across industries in over 30 countries. Our growth has been driven by our unwavering commitment to innovation and our focus on delivering measurable value to our clients.
              </p>
              <p className="text-gray-600">
                Today, AI Solution stands at the forefront of the AI revolution, continuing to push boundaries and redefine what's possible in business automation and intelligence.
              </p>
            </div>
            <div className="w-full md:w-6/12 px-4">
              <div className="rounded-lg bg-gray-100 h-96 flex items-center justify-center">
                <img className='w-full h-full object-cover' src="/assets/company.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision, Mission, and Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Our Vision, Mission & Values</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                The principles that guide our work and shape our company culture.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-4/12 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-8 h-full">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                  <FiTarget className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To create a world where businesses can focus on innovation and growth by delegating routine operations to intelligent AI assistants that learn, adapt, and improve over time.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-4/12 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-8 h-full">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                  <FiCompass className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To develop and deliver AI solutions that understand the unique context of each business, simplify complex processes, and enable companies of all sizes to achieve operational excellence.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-4/12 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-8 h-full">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                  <FiAward className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
                <p className="text-gray-600">
                  Innovation, integrity, customer-centricity, and continuous improvement form the foundation of everything we do. We believe in ethical AI development and transparent business practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Core Values</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                The principles that drive our innovation and shape our approach.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-3/12 px-4 mb-10">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                  <FiUsers className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
                <p className="text-gray-600">
                  We prioritize our clients' needs above all else, ensuring our solutions address their unique challenges.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-6/12 lg:w-3/12 px-4 mb-10">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                  <FiCodepen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We constantly push the boundaries of what's possible with AI to deliver cutting-edge solutions.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-6/12 lg:w-3/12 px-4 mb-10">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                  <FiClock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Adaptability</h3>
                <p className="text-gray-600">
                  Our solutions evolve alongside our clients' needs, continuously learning and improving.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-6/12 lg:w-3/12 px-4 mb-10">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We maintain the highest ethical standards in AI development and client relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Our Leadership</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Meet the team driving our vision forward.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap">
            <div className="w-full md:w-4/12 lg:w-3/12 px-4 mb-10">
              <div className="text-center">
                <div className="mb-6 rounded-full bg-gray-300 h-48 w-48 mx-auto flex items-center justify-center">
                  <img className='w-full h-full object-cover rounded-full' src="/assets/p1.jpg" alt="" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Dr. Emily Chen</h3>
                <p className="text-gray-600 mb-3">CEO & Co-Founder</p>
                <p className="text-gray-600 text-sm px-4">
                  AI researcher with 15+ years of experience in machine learning and business transformation.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-4/12 lg:w-3/12 px-4 mb-10">
              <div className="text-center">
                <div className="mb-6 rounded-full bg-gray-300 h-48 w-48 mx-auto flex items-center justify-center">
                  <img className='w-full h-full object-cover rounded-full' src="/assets/p2.jpg" alt="" />
                </div>
                <h3 className="text-xl font-semibold mb-1">James Wilson</h3>
                <p className="text-gray-600 mb-3">CTO & Co-Founder</p>
                <p className="text-gray-600 text-sm px-4">
                  Former VP of Engineering at a Fortune 500 company with deep expertise in AI systems.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-4/12 lg:w-3/12 px-4 mb-10">
              <div className="text-center">
                <div className="mb-6 rounded-full bg-gray-300 h-48 w-48 mx-auto flex items-center justify-center">
                  <img className='w-full h-full object-cover rounded-full' src="/assets/p3.jpg" alt="" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Sarah Martinez</h3>
                <p className="text-gray-600 mb-3">COO</p>
                <p className="text-gray-600 text-sm px-4">
                  Operations specialist who has scaled multiple tech startups to global success.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-4/12 lg:w-3/12 px-4 mb-10">
              <div className="text-center">
                <div className="mb-6 rounded-full bg-gray-300 h-48 w-48 mx-auto flex items-center justify-center">
                  <img className='w-full h-full object-cover rounded-full' src="/assets/p4.jpg" alt="" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Michael Okonjo</h3>
                <p className="text-gray-600 mb-3">Chief Innovation Officer</p>
                <p className="text-gray-600 text-sm px-4">
                  Award-winning AI developer focused on creating ethical and effective AI solutions.
                </p>
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
              <h2 className="text-4xl font-bold mb-4">Join Our Journey</h2>
              <p className="text-lg leading-relaxed mb-8 text-gray-600">
                Partner with us to transform your business operations and unlock new possibilities with AI.
              </p>
              <Link to='/contactus' className="bg-green-400 text-white font-bold px-6 py-3 rounded-full hover:bg-green-400 transition duration-300 inline-flex items-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <FooterComponent />
    </div>
  )
}

export default AboutScreen