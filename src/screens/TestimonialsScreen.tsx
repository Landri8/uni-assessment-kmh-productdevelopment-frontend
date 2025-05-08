// TestimonialsPage.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiBriefcase,
  FiMessageSquare,
} from "react-icons/fi";
import NavBarComponent from "../components/NavBarComponent";
import FooterComponent from "../components/FooterComponent";
import { Link } from "react-router-dom";
import { getFeedbackListApi, sendFeedbackApi } from "../services/clientService";
import ResponseModel from "../models/response.model";
import { httpResponseHandler } from "../utils/responseHandlerUtil";
import FeedbackInfoModel from "../models/feedback.model";
import toast from "react-hot-toast";
import {
  FeedbackCreationFormData,
  FeedbackCreationFormSchema,
} from "../schemas/FeedbackCreationFormSchema";

const TestimonialsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [feedbacks, setFeedbacks] = useState<FeedbackInfoModel[]>([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Array of testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechCorp",
      rating: 5,
      feedback:
        "The AI virtual assistant has transformed how we handle customer inquiries. Response times are down by 80%, and customer satisfaction is up by 40%. We're now expanding our use of AI Solution across all departments.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Operations Manager",
      company: "Globex Industries",
      rating: 5,
      feedback:
        "Implementing the AI Solution has helped us automate our scheduling system completely, saving us countless hours and reducing errors. The integration was smooth and the support team was extremely helpful throughout the process.",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Data Analyst",
      company: "Innovate Inc.",
      rating: 4,
      feedback:
        "The data analysis capabilities of this AI system have given us insights we never would have discovered otherwise. A game-changer for our strategy, though we did have a few initial integration challenges.",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Customer Service Director",
      company: "Retail Connect",
      rating: 5,
      feedback:
        "Our customer satisfaction scores have increased dramatically since implementing AI Solution's virtual assistant. The AI's ability to handle complex inquiries and learn from interactions is impressive.",
    },
    {
      id: 5,
      name: "Amanda Patel",
      role: "HR Director",
      company: "Global Services Ltd",
      rating: 4,
      feedback:
        "We've used AI Solution to streamline our employee onboarding process. The time savings and consistency have been remarkable. Still waiting on a few advanced features, but overall very satisfied.",
    },
    {
      id: 6,
      name: "Robert Thompson",
      role: "CEO",
      company: "Startup Innovators",
      rating: 5,
      feedback:
        "As a startup, we needed to maximize efficiency with minimal staff. AI Solution's virtual assistants have allowed us to operate like a much larger company while focusing our human resources on growth and innovation.",
    },
  ];

  // react-hook-form initialization with Zod resolver
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FeedbackCreationFormSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      rating: 0,
      feedback: "",
    },
  });

  const getFeedbackList = () => {
    setIsLoading(true);
    getFeedbackListApi()
      .then(({ data }: { data: ResponseModel }) => {
        const getFeedBackListResponseData = httpResponseHandler(data);
        setFeedbacks(getFeedBackListResponseData);
      })
      .catch((error) => toast.error("Fetching feedback list failed"))
      .finally(() => setIsLoading(false));
  };

  const onSubmit = async (data: FeedbackCreationFormData) => {
    try {
      setIsSubmitting(true);

      const { data: responseData }: { data: ResponseModel } =
        await sendFeedbackApi(data);

      const sendResponseData = httpResponseHandler(responseData);

      toast.success(responseData.message);
      reset();
      setCurrentRating(0);
      setShowForm(false);
    } catch (error: Error | any) {
      console.error("Error creating event:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setCurrentRating(rating);
    setValue("rating", rating);
  };

  // Generate star rating UI
  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <div
              key={index}
              className={`${interactive ? "cursor-pointer" : ""} mr-1`}
              onClick={
                interactive ? () => handleRatingClick(starValue) : undefined
              }
              onMouseEnter={
                interactive ? () => setHoverRating(starValue) : undefined
              }
              onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            >
              <FiStar
                className={`h-5 w-5 ${
                  (interactive ? hoverRating || currentRating : rating) >=
                  starValue
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getFeedbackList();
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
                Client Testimonials
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover what our clients have to say about their experience
                with AI Solution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">
                What Our Clients Are Saying
              </h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Real feedback from businesses who have transformed their
                operations with our AI solutions.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="flex flex-wrap">
              {feedbacks.map((feedback: FeedbackInfoModel) => (
                <div
                  key={feedback.id}
                  className="w-full md:w-6/12 lg:w-4/12 px-4 mb-12"
                >
                  <div className="bg-white rounded-lg shadow-md p-8 h-full flex flex-col border-t-4 border-green-500">
                    <div className="mb-4">
                      {renderStars(feedback.rating)}
                    </div>

                    <p className="text-gray-600 italic mb-6 flex-grow">
                      "{feedback.feedback}"
                    </p>

                    <div className="flex items-center mt-auto">
                      <img
                          className="w-10 h-10 rounded-full mr-4"
                          src={`/assets/p${Math.floor(Math.random() * 4) + 1}.jpg`}
                          alt=""
                        />
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {feedback.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feedback.role}, {feedback.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-gray-600 text-center">No feedbacks found</p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-4/12 px-4 mb-8 text-center">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-4xl font-bold text-green-500 mb-2">98%</h3>
                <p className="text-lg text-gray-600">Client Satisfaction</p>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 mb-8 text-center">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-4xl font-bold text-green-500 mb-2">500+</h3>
                <p className="text-lg text-gray-600">Businesses Served</p>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 mb-8 text-center">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-4xl font-bold text-green-500 mb-2">
                  4.8/5
                </h3>
                <p className="text-lg text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
              <p className="text-lg text-gray-600 mb-6">
                We value your feedback. Let us know about your experience with
                AI Solution.
              </p>

              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center justify-center mx-auto bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition duration-300"
              >
                {showForm ? (
                  <>
                    <FiChevronUp className="mr-2" />
                    Hide Feedback Form
                  </>
                ) : (
                  <>
                    <FiChevronDown className="mr-2" />
                    Share Your Feedback
                  </>
                )}
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-10 border border-gray-200">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="mb-6 text-center">
                    <label className="block text-sm font-medium mb-3 text-gray-700">
                      Your Rating
                    </label>
                    <div className="flex justify-center">
                      {renderStars(currentRating, true)}
                    </div>
                    <input
                      type="hidden"
                      value={currentRating}
                      {...register("rating", { valueAsNumber: true })}
                    />
                    {errors.rating && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.rating.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          className={`w-full pl-10 px-4 py-2 bg-white border rounded-lg ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="John Doe"
                          {...register("name")}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Your Role
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          id="role"
                          type="text"
                          className={`w-full pl-10 px-4 py-2 bg-white border rounded-lg ${
                            errors.role ? "border-red-500" : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="CTO"
                          {...register("role")}
                        />
                      </div>
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Company
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiBriefcase className="text-gray-400" />
                        </div>
                        <input
                          id="company"
                          type="text"
                          className={`w-full pl-10 px-4 py-2 bg-white border rounded-lg ${
                            errors.company
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="Acme Inc."
                          {...register("company")}
                        />
                      </div>
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="feedback"
                      className="block text-sm font-medium mb-1 text-gray-700"
                    >
                      Your Feedback
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <FiMessageSquare className="text-gray-400" />
                      </div>
                      <textarea
                        id="feedback"
                        rows={5}
                        className={`w-full pl-10 px-4 py-2 bg-white border rounded-lg ${
                          errors.feedback ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="Share your experience with our AI solutions..."
                        {...register("feedback")}
                      ></textarea>
                    </div>
                    {errors.feedback && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.feedback.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setCurrentRating(0);
                        setShowForm(false);
                      }}
                      className="mr-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="text-center">
              <p className="text-gray-600">
                Your feedback helps us improve our services and better meet the
                needs of businesses like yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto text-center">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Experience the Difference?
              </h2>
              <p className="text-lg leading-relaxed mb-8 text-gray-600">
                Join hundreds of satisfied businesses that have transformed
                their operations with AI Solution.
              </p>
              <Link
                to="/contactus"
                className="bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 inline-flex items-center"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterComponent />
    </div>
  );
};

export default TestimonialsPage;
