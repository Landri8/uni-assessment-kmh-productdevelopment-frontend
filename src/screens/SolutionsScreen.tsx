import React, { useEffect } from 'react'
import NavBarComponent from '../components/NavBarComponent'
import FooterComponent from '../components/FooterComponent'
import { FiBarChart2, FiMessageSquare, FiServer, FiSettings, FiShield, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const SolutionsScreen = () => {
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
                        Our AI Solutions
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Transforming business operations with intelligent virtual assistants customized for your unique challenges.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Core Solutions Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center text-center mb-16">
                    <div className="w-full lg:w-6/12 px-4">
                    <h2 className="text-4xl font-bold">What We Offer</h2>
                    <p className="text-lg leading-relaxed m-4 text-gray-600">
                        Our AI-powered solutions address a wide range of business needs across industries.
                    </p>
                    </div>
                </div>
                
                <div className="flex flex-wrap">
                    <div className="w-full md:w-6/12 lg:w-4/12 px-4 mb-10">
                    <div className="bg-white rounded-lg shadow-md p-8 h-full border-t-4 border-green-500">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                        <FiSettings className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Business Operations Assistant</h3>
                        <p className="text-gray-600 mb-4">
                        Automate scheduling, manage resources, handle inventory, process invoices, and coordinate communications across teams.
                        </p>
                        <ul className="text-gray-600 list-disc pl-5 mb-4">
                        <li>Workflow automation</li>
                        <li>Resource optimization</li>
                        <li>Document processing</li>
                        <li>Scheduling optimization</li>
                        </ul>
                    </div>
                    </div>
                    
                    <div className="w-full md:w-6/12 lg:w-4/12 px-4 mb-10">
                    <div className="bg-white rounded-lg shadow-md p-8 h-full border-t-4 border-green-500">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                        <FiUsers className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Customer Service AI</h3>
                        <p className="text-gray-600 mb-4">
                        Provide 24/7 customer support with AI that understands context, emotion, and complex inquiries across multiple channels.
                        </p>
                        <ul className="text-gray-600 list-disc pl-5 mb-4">
                        <li>Multilingual support</li>
                        <li>Sentiment analysis</li>
                        <li>Self-learning capabilities</li>
                        <li>Omnichannel integration</li>
                        </ul>
                    </div>
                    </div>
                    
                    <div className="w-full md:w-6/12 lg:w-4/12 px-4 mb-10">
                    <div className="bg-white rounded-lg shadow-md p-8 h-full border-t-4 border-green-500">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-6">
                        <FiBarChart2 className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Analytics & Insights</h3>
                        <p className="text-gray-600 mb-4">
                        Transform raw data into actionable business intelligence with AI-powered analytics that identify patterns, forecast trends, and recommend strategies.
                        </p>
                        <ul className="text-gray-600 list-disc pl-5 mb-4">
                        <li>Predictive analytics</li>
                        <li>Market trend analysis</li>
                        <li>Performance monitoring</li>
                        <li>Custom reporting</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            
            {/* Case Studies Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center text-center mb-12">
                    <div className="w-full lg:w-6/12 px-4">
                    <h2 className="text-4xl font-bold">Problems We've Solved</h2>
                    <p className="text-lg leading-relaxed m-4 text-gray-600">
                        Real-world examples of how our AI solutions have transformed operations for leading organizations.
                    </p>
                    </div>
                </div>
                
                <div className="flex flex-wrap">
                    {/* Case Study 1 */}
                    <div className="w-full lg:w-6/12 px-4 mb-12">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-64 bg-gray-200 flex items-center justify-center">
                            <img className='w-full h-full object-cover' src="/assets/s1.png" alt="" />
                        </div>
                        <div className="p-8">
                        <div className="flex items-center mb-4">
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-sm font-bold mr-2">Retail</span>
                            <span className="px-2 py-1 bg-blue-100 text-green-500 rounded text-sm font-bold">Customer Service</span>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Global Retail Chain</h3>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Challenge:</h4>
                        <p className="text-gray-600 mb-4">
                            A Fortune 500 retail company was struggling with customer service scalability during peak seasons, leading to long wait times and decreased satisfaction scores.
                        </p>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Solution:</h4>
                        <p className="text-gray-600 mb-4">
                            We implemented our omnichannel Customer Service AI to handle 70% of routine inquiries across web, mobile, and social platforms, with seamless handoff to human agents for complex issues.
                        </p>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Results:</h4>
                        <ul className="text-gray-600 list-disc pl-5 mb-4">
                            <li>85% reduction in average response time</li>
                            <li>42% increase in customer satisfaction scores</li>
                            <li>$4.2M annual savings in support costs</li>
                            <li>Support volume capacity increased by 300%</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    
                    {/* Case Study 2 */}
                    <div className="w-full lg:w-6/12 px-4 mb-12">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-64 bg-gray-200 flex items-center justify-center">
                            <img className='w-full h-full object-cover' src="/assets/s2.png" alt="" />
                        </div>
                        <div className="p-8">
                        <div className="flex items-center mb-4">
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm font-bold mr-2">Healthcare</span>
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-sm font-bold">Operations</span>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Regional Hospital Network</h3>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Challenge:</h4>
                        <p className="text-gray-600 mb-4">
                            A network of 12 hospitals was facing scheduling inefficiencies that led to staff burnout, increased costs, and suboptimal patient care coordination.
                        </p>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Solution:</h4>
                        <p className="text-gray-600 mb-4">
                            Our Business Operations Assistant was tailored to optimize staff scheduling based on patient volume predictions, skill requirements, and staff preferences while maintaining compliance with healthcare regulations.
                        </p>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Results:</h4>
                        <ul className="text-gray-600 list-disc pl-5 mb-4">
                            <li>23% reduction in overtime costs</li>
                            <li>19% improvement in staff satisfaction scores</li>
                            <li>32% decrease in scheduling conflicts</li>
                            <li>Improved patient-to-staff ratios across all facilities</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    
                    {/* Case Study 3 */}
                    <div className="w-full lg:w-6/12 px-4 mb-12">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-64 bg-gray-200 flex items-center justify-center">
                            <img className='w-full h-full object-cover' src="/assets/s3.png" alt="" />
                        </div>
                        <div className="p-8">
                        <div className="flex items-center mb-4">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-sm font-bold mr-2">Finance</span>
                            <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm font-bold">Analytics</span>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Investment Management Firm</h3>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Challenge:</h4>
                        <p className="text-gray-600 mb-4">
                            A mid-sized investment firm struggled to analyze vast amounts of market data quickly enough to identify time-sensitive investment opportunities.
                        </p>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Solution:</h4>
                        <p className="text-gray-600 mb-4">
                            Our Analytics & Insights solution was deployed to process market data in real-time, using natural language processing to analyze news and sentiment while identifying emerging patterns.
                        </p>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Results:</h4>
                        <ul className="text-gray-600 list-disc pl-5 mb-4">
                            <li>12.4% improvement in portfolio performance</li>
                            <li>85% of market opportunities identified before competitors</li>
                            <li>Data processing time reduced from hours to seconds</li>
                            <li>Analyst productivity increased by 40%</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    
                    {/* Case Study 4 */}
                    <div className="w-full lg:w-6/12 px-4 mb-12">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-64 bg-gray-200 flex items-center justify-center">
                            <img className='w-full h-full object-cover' src="/assets/s4.png" alt="" />
                        </div>
                        <div className="p-8">
                        <div className="flex items-center mb-4">
                            <span className="px-2 py-1 bg-blue-100 text-green-500 rounded text-sm font-bold mr-2">Manufacturing</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm font-bold">Supply Chain</span>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Global Automotive Manufacturer</h3>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Challenge:</h4>
                        <p className="text-gray-600 mb-4">
                            An automotive manufacturer faced supply chain disruptions that led to production delays, increased costs, and failure to meet customer delivery deadlines.
                        </p>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Solution:</h4>
                        <p className="text-gray-600 mb-4">
                            We implemented a customized version of our Business Operations Assistant that monitored global supply chain factors, predicted disruptions, and automatically adjusted procurement and production schedules.
                        </p>
                        <h4 className="text-lg font-medium text-gray-700 mb-4">Results:</h4>
                        <ul className="text-gray-600 list-disc pl-5 mb-4">
                            <li>78% reduction in production line stoppages</li>
                            <li>34% decrease in excess inventory costs</li>
                            <li>91% of disruptions predicted with at least 2 weeks' notice</li>
                            <li>On-time delivery improved from 76% to 94%</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            
            {/* How We Work Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center text-center mb-12">
                    <div className="w-full lg:w-6/12 px-4">
                    <h2 className="text-4xl font-bold">How We Deliver Solutions</h2>
                    <p className="text-lg leading-relaxed m-4 text-gray-600">
                        Our proven methodology ensures every AI solution is tailored to your specific needs.
                    </p>
                    </div>
                </div>
                
                <div className="flex flex-wrap items-center">
                    <div className="w-full md:w-6/12 px-4 mb-10 md:mb-0">
                    <div className="relative">
                        <div className="border-l-4 border-green-500 pl-8 ml-6">
                        <div className="relative mb-10">
                            <div className="h-12 w-12 rounded-full bg-green-400 absolute -left-[58px] flex items-center justify-center text-white font-bold">1</div>
                            <h3 className="text-xl font-semibold mb-2">Discovery & Assessment</h3>
                            <p className="text-gray-600">We analyze your operations, pain points, and goals to identify where AI can create the most value.</p>
                        </div>
                        
                        <div className="relative mb-10">
                            <div className="h-12 w-12 rounded-full bg-green-400 absolute -left-[58px] flex items-center justify-center text-white font-bold">2</div>
                            <h3 className="text-xl font-semibold mb-2">Solution Design</h3>
                            <p className="text-gray-600">Our engineers design a custom solution architecture that integrates with your existing systems and processes.</p>
                        </div>
                        
                        <div className="relative mb-10">
                            <div className="h-12 w-12 rounded-full bg-green-400 absolute -left-[58px] flex items-center justify-center text-white font-bold">3</div>
                            <h3 className="text-xl font-semibold mb-2">Implementation & Training</h3>
                            <p className="text-gray-600">We deploy the solution and train the AI using your historical data to ensure it understands your specific context.</p>
                        </div>
                        
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-green-400 absolute -left-[58px] flex items-center justify-center text-white font-bold">4</div>
                            <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                            <p className="text-gray-600">Our AI continues to learn and adapt based on ongoing interactions and feedback, becoming more effective over time.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                    <div className="w-full md:w-6/12 px-4">
                    <div className="bg-green-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Our Technical Approach</h3>
                        <p className="text-gray-600 mb-6">
                        We combine multiple AI technologies to create comprehensive solutions:
                        </p>
                        <ul className="space-y-4">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-1">
                            <FiMessageSquare className="h-3 w-3" />
                            </div>
                            <div>
                            <h4 className="font-semibold">Natural Language Processing</h4>
                            <p className="text-gray-600">Enables understanding of human communication in all its complexity.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-1">
                            <FiServer className="h-3 w-3" />
                            </div>
                            <div>
                            <h4 className="font-semibold">Machine Learning</h4>
                            <p className="text-gray-600">Allows our solutions to improve automatically through experience.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-1">
                            <FiBarChart2 className="h-3 w-3" />
                            </div>
                            <div>
                            <h4 className="font-semibold">Predictive Analytics</h4>
                            <p className="text-gray-600">Forecasts future outcomes based on historical data patterns.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-1">
                            <FiShield className="h-3 w-3" />
                            </div>
                            <div>
                            <h4 className="font-semibold">Secure Integration</h4>
                            <p className="text-gray-600">Enterprise-grade security protocols protect sensitive business data.</p>
                            </div>
                        </li>
                        </ul>
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
                        Schedule a demo to see how our AI solutions can address your specific challenges.
                    </p>
                    <Link to="/contactus" className="bg-green-400 text-white font-bold px-6 py-3 rounded-full hover:bg-green-400 transition duration-300 inline-flex items-center">
                        Schedule Demo
                    </Link>
                    </div>
                </div>
                </div>
            </section>
            <FooterComponent />
        </div>
    )
}

export default SolutionsScreen