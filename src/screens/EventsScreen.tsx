import React, { useEffect, useState } from "react";
import { FiArrowRight, FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import NavBarComponent from "../components/NavBarComponent";
import FooterComponent from "../components/FooterComponent";
import EventInfoModel from "../models/event.model";
import { getEventListApi } from "../services/clientService";
import toast from "react-hot-toast";
import ResponseModel from "../models/response.model";
import { httpResponseHandler } from "../utils/responseHandlerUtil";

const EventsScreen = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventInfoModel[]>([]);

  const getEventList = () => {
    setIsLoading(true);
    getEventListApi()
    .then(({ data }: { data: ResponseModel }) => {
      const getEventListResponseData = httpResponseHandler(data);
      setEvents(getEventListResponseData);
    })
    .catch((error) => toast.error("Fetching event list failed"))
    .finally(() => setIsLoading(false));
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return "Invalid date";
    
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Function to get type-specific styling
  const getTypeStyles = (type) => {
    switch (type.toLowerCase()) {
      case "conference":
        return {
          bgColor: "bg-purple-400",
          textColor: "text-purple-600",
          tagBgColor: "bg-white",
        };
      case "workshop":
        return {
          bgColor: "bg-green-400",
          textColor: "text-green-600",
          tagBgColor: "bg-white",
        };
      case "seminar":
        return {
          bgColor: "bg-blue-400",
          textColor: "text-blue-600",
          tagBgColor: "bg-white",
        };
      case "meetup":
        return {
          bgColor: "bg-yellow-400",
          textColor: "text-yellow-600",
          tagBgColor: "bg-white",
        };
      case "webinar":
        return {
          bgColor: "bg-indigo-400",
          textColor: "text-indigo-600",
          tagBgColor: "bg-white",
        };
      default:
        return {
          bgColor: "bg-gray-400",
          textColor: "text-gray-600",
          tagBgColor: "bg-white",
        };
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);

    getEventList();
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
                Events & Webinars
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join us for insightful discussions, demonstrations, and
                networking opportunities in the world of AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Upcoming Events</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Reserve your spot at our upcoming events to learn about the
                latest in AI technology and solutions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap">
            {
              isLoading ? (
                <div className="w-full flex justify-center items-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
              ) : (
               events.length > 0 ? (
                events.map((event) => {
                  const typeStyles = getTypeStyles(event.type);
                  
                  return (
                    <div 
                      key={event.id} 
                      className="w-full md:w-6/12 lg:w-4/12 px-4 mb-12"
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                        <div className={`h-48 ${typeStyles.bgColor} relative`}>
                          <div className={`absolute top-4 left-4 ${typeStyles.tagBgColor} px-4 py-2 rounded-full ${typeStyles.textColor} font-bold`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-1/2"></div>
                          <div className="absolute bottom-4 left-4 text-black font-bold">
                            {formatDate(event.date)}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold mb-4">
                            {event.title}
                          </h3>
                          <div className="flex items-center mb-3 text-gray-600">
                            <FiClock className="mr-2" />
                            <span>{event.timeRange}</span>
                          </div>
                          <div className="flex items-center mb-3 text-gray-600">
                            <FiMapPin className="mr-2" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center mb-4 text-gray-600">
                            <FiUsers className="mr-2" />
                            <span>Presented by {event.presenter}</span>
                          </div>
                          <p className="text-gray-600 mb-4">
                            {event.eventDesc}
                          </p>
                          <div className="flex justify-between items-center mt-auto">
                            <button className={`${typeStyles.bgColor} text-white font-bold px-4 py-2 rounded-lg hover:bg-opacity-90 transition duration-300`}>
                              Register Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
               ) : (
                <div className="w-full h-96 bg-gray-100 flex justify-center items-center mb-16">
                  <p className="text-2xl font-bold text-gray-600">
                    No Upcoming Events
                  </p>
                </div>
               )
              )
            }
          </div>

          <div className="text-center mt-4">
            <button className="inline-flex items-center text-green-500 font-bold hover:text-green-600 transition duration-300">
              View All Upcoming Events
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Event Calendar</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Plan ahead with our schedule of events for the coming months.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-7 bg-green-400 text-white font-bold py-2">
              <div className="text-center">Sun</div>
              <div className="text-center">Mon</div>
              <div className="text-center">Tue</div>
              <div className="text-center">Wed</div>
              <div className="text-center">Thu</div>
              <div className="text-center">Fri</div>
              <div className="text-center">Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-1 p-4">
              {/* Sample calendar days - normally this would be dynamically generated */}
              {[...Array(35)].map((_, i) => {
                const day = i - 3; // Offset to start month on the correct day
                if (day <= 0 || day > 31) {
                  return (
                    <div
                      key={i}
                      className="p-2 text-center text-gray-400"
                    ></div>
                  );
                }

                // Add some "event" days
                const hasEvent = [5, 8, 10, 15, 16, 17, 22, 28].includes(day);

                return (
                  <div
                    key={i}
                    className={`p-2 text-center rounded ${
                      hasEvent ? "bg-green-100" : ""
                    }`}
                  >
                    <div className="font-medium">{day}</div>
                    {hasEvent && (
                      <div className="w-2 h-2 rounded-full bg-green-400 mx-auto mt-1"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="bg-green-400 text-white font-bold px-6 py-3 rounded-full hover:bg-green-400 transition duration-300">
              Download Full Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Past Events Highlights</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Explore the moments and insights from our previous events and
                conferences.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            {/* Gallery Item 1 */}
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
              <div className="relative overflow-hidden rounded-lg group">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <img className="w-full h-full object-cover" src="/assets/e1.jpg" alt="" />
                </div>
                <div className="absolute inset-0 bg-green-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-black text-center p-4">
                    <h3 className="text-xl font-bold mb-2">AI Summit 2022</h3>
                    <p>
                      Over 500 attendees joined us for discussions on the future
                      of business AI
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
              <div className="relative overflow-hidden rounded-lg group">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <img className="w-full h-full object-cover" src="/assets/e2.webp" alt="" />
                </div>
                <div className="absolute inset-0 bg-green-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-black text-center p-4">
                    <h3 className="text-xl font-bold mb-2">
                      Healthcare AI Workshop
                    </h3>
                    <p>
                      Specialized training for healthcare professionals on
                      implementing AI assistants
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
              <div className="relative overflow-hidden rounded-lg group">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <img className="w-full h-full object-cover" src="/assets/e3.jpeg" alt="" />
                </div>
                <div className="absolute inset-0 bg-green-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-black text-center p-4">
                    <h3 className="text-xl font-bold mb-2">
                      Customer Experience Webinar
                    </h3>
                    <p>
                      Virtual event showcasing how AI is transforming customer
                      support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 4 */}
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
              <div className="relative overflow-hidden rounded-lg group">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <img className="w-full h-full object-cover" src="/assets/e4.jpg" alt="" />
                </div>
                <div className="absolute inset-0 bg-green-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-black text-center p-4">
                    <h3 className="text-xl font-bold mb-2">
                      AI in Finance Panel
                    </h3>
                    <p>
                      Industry leaders discussed AI applications in financial
                      services
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 5 */}
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
              <div className="relative overflow-hidden rounded-lg group">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <img className="w-full h-full object-cover" src="/assets/e5.webp" alt="" />
                </div>
                <div className="absolute inset-0 bg-green-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-black text-center p-4">
                    <h3 className="text-xl font-bold mb-2">
                      Tech Meetup Series
                    </h3>
                    <p>
                      Monthly gatherings for tech professionals to network and
                      share insights
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 6 */}
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
              <div className="relative overflow-hidden rounded-lg group">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <img className="w-full h-full object-cover" src="/assets/e6.jpg" alt="" />
                </div>
                <div className="absolute inset-0 bg-green-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-black text-center p-4">
                    <h3 className="text-xl font-bold mb-2">
                      Product Launch 2022
                    </h3>
                    <p>
                      Unveiling our next-generation AI platform with live
                      demonstrations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="inline-flex items-center text-green-500 font-bold hover:text-green-600 transition duration-300">
              View Full Event Archive
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Event Testimonials</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Hear what past attendees have to say about our events.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-8 h-full">
                <div className="flex items-center mb-6">
                  <img className="w-12 h-12 bg-gray-300 rounded-full mr-4" src="/assets/p1.jpg" alt="" />
                  <div>
                    <h4 className="font-bold">Robert Michaels</h4>
                    <p className="text-sm text-gray-600">
                      CIO, Global Finance Corp
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The AI Summit was incredibly informative. I came away with
                  actionable insights that we've already begun implementing in
                  our organization. The networking opportunities were invaluable
                  as well."
                </p>
                <p className="text-gray-500 text-sm">AI Summit 2022</p>
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-8 h-full">
                <div className="flex items-center mb-6">
                  <img className="w-12 h-12 bg-gray-300 rounded-full mr-4" src="/assets/p2.jpg" alt="" />
                  <div>
                    <h4 className="font-bold">Jennifer Liu</h4>
                    <p className="text-sm text-gray-600">
                      Head of Operations, TechStart
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The workshops were hands-on and practical. I appreciated that
                  the content was tailored to different experience levels,
                  allowing everyone to get value regardless of their AI
                  knowledge."
                </p>
                <p className="text-gray-500 text-sm">
                  Hands-on AI Workshop Series
                </p>
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-8 h-full">
                <div className="flex items-center mb-6">
                  <img className="w-12 h-12 bg-gray-300 rounded-full mr-4" src="/assets/p3.jpg" alt="" />
                  <div>
                    <h4 className="font-bold">Dr. Marcus Brown</h4>
                    <p className="text-sm text-gray-600">
                      Healthcare Innovation Director
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The Healthcare AI Workshop addressed the unique challenges of
                  implementing AI in clinical settings. The presenters
                  understood our regulatory concerns and offered solutions that
                  work within our constraints."
                </p>
                <p className="text-gray-500 text-sm">Healthcare AI Workshop</p>
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
              <h2 className="text-4xl font-bold mb-4">Join Our Next Event</h2>
              <p className="text-lg leading-relaxed mb-8 text-gray-600">
                Stay informed about our upcoming events, webinars, and
                workshops. Be the first to know when registration opens.
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex flex-wrap md:flex-nowrap mb-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full md:flex-1 px-4 py-3 rounded-full md:rounded-r-none mb-2 md:mb-0 focus:outline-none border border-gray-300"
                  />
                  <button className="w-full md:w-auto bg-green-400 text-white font-bold px-6 py-3 rounded-full md:rounded-l-none hover:bg-green-400 transition duration-300">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  We'll never share your email. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterComponent />
    </div>
  );
};

export default EventsScreen;
