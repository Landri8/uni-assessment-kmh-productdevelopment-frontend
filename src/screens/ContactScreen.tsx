import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  getVerficationCodeApi,
  sendMessageApi,
  verifyEmailApi,
} from "../services/clientService";
import { httpResponseHandler } from "../utils/responseHandlerUtil";
import toast from "react-hot-toast";
import ResponseModel from "../models/response.model";
import { FiMail, FiMapPin, FiMessageSquare, FiPhone } from "react-icons/fi";
import FooterComponent from "../components/FooterComponent";
import NavBarComponent from "../components/NavBarComponent";

// Define the validation schema with Zod
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  companyName: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Please select a country"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDetails: z.string().optional(),
  contactPreference: z.string().optional(),
});

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().min(4, "Please enter the verification code").max(6),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

const ContactScreen = () => {
  // Form stages
  const [formStage, setFormStage] = useState<
    "form" | "verification" | "success"
  >("form");
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);
  const [isGettingOtp, setIsGettingOtp] = useState(false);
  const [formData, setFormData] = useState<ContactFormValues | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Main form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
    reset,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactPreference: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      country: "",
      jobTitle: "",
      jobDetails: "",
    },
  });

  // OTP form
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
    setValue: setOtpValue,
    reset: resetOtp,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const contactPreference = watch("contactPreference");
  const emailWatcher = watch("email");

  // Start OTP verification process
  const onSubmitForm = async (data: ContactFormValues) => {
    try {
      setFormData(data);
      await handleGetOTPCode();
      setFormStage("verification");
    } catch (error) {
      console.error("Error starting verification:", error);
      toast.error("Failed to start verification process");
    }
  };

  // Get OTP code
  const handleGetOTPCode = async () => {
    try {
      setIsGettingOtp(true);
      const email = getValues("email");

      // Call API to get OTP
      const { data: responseData } = await getVerficationCodeApi({ email });
      const result = httpResponseHandler(responseData);

      if (result) {
        toast.success("Verification code sent to your email");
        setOtpSent(true);
        startResendCooldown();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to send verification code");
    } finally {
      setIsGettingOtp(false);
    }
  };

  // Handle OTP verification
  const onVerifyOtp = async (data: OtpFormValues) => {
    console.log(data);
    try {
      setIsSubmittingOtp(true);

      if (!formData) {
        throw new Error("Form data is missing");
      }

      // Verify OTP
      const { data: responseData } = await verifyEmailApi({
        email: formData.email,
        otp: data.otp,
      });

      const result = httpResponseHandler(responseData);

      await submitContactForm();
    } catch (error: any) {
      toast.error(error?.message || "Verification failed");
    } finally {
      setIsSubmittingOtp(false);
    }
  };

  // Submit the actual contact form
  const submitContactForm = async () => {
    try {
      if (!formData) return;
      const { data: responseData }: { data: ResponseModel } =
        await sendMessageApi({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          country: formData.country,
          jobTitle: formData.jobTitle,
          jobDetails: formData.jobDetails || "",
        });
      console.log(responseData);

      const sendMessageResponseData = httpResponseHandler(responseData);
      reset();
      setValue("phone", "+95 ");
      toast.success(responseData.message);

      // Show success message
      toast.success("Form submitted successfully!");
      setFormStage("success");
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit form");
      // Go back to form stage if submission fails
      setFormStage("form");
    }
  };

  // Start cooldown for resend button
  const startResendCooldown = () => {
    setResendDisabled(true);
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Go back to form
  const handleGoBack = () => {
    setFormStage("form");
    resetOtp();
  };

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
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Have questions about our AI solutions? We're here to help you
                transform your business.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <section className="py-12 -mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-4/12 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <FiMail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">
                  Our support team is available to help you with any questions.
                </p>
                <a
                  href="mailto:support@aisolution.com"
                  className="text-green-500 font-medium hover:text-green-600"
                >
                  support@aisolution.com
                </a>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <FiPhone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  Speak directly with our sales or support team.
                </p>
                <a
                  href="tel:+1-800-123-4567"
                  className="text-green-500 font-medium hover:text-green-600"
                >
                  +1 (800) 123-4567
                </a>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <FiMapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">
                  Schedule a visit to our headquarters.
                </p>
                <p className="text-gray-700">
                  123 AI Boulevard, Suite 500
                  <br />
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-5/12 bg-green-400 p-8 lg:p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">
                  Let's Start a Conversation
                </h2>
                <p className="mb-8">
                  Fill out the form and our team will get back to you within 24
                  hours. We're excited to hear from you and discuss how our AI
                  solutions can transform your business.
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
                    What Happens Next?
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-green-600 flex items-center justify-center font-bold mr-3">
                        1
                      </span>
                      <p>We'll contact you to discuss your needs</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-green-600 flex items-center justify-center font-bold mr-3">
                        2
                      </span>
                      <p>Our experts will prepare a customized demo</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-green-600 flex items-center justify-center font-bold mr-3">
                        3
                      </span>
                      <p>
                        We'll present a solution tailored to your requirements
                      </p>
                    </li>
                  </ol>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <FiMail className="mr-3" />
                    <span>support@aisolution.com</span>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="mr-3" />
                    <span>+1 (800) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-3" />
                    <span>123 AI Boulevard, San Francisco</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-7/12 p-8 lg:p-12">
                {formStage === "form" && (
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmitForm)}
                  >
                    {/* Hidden contact preference - keeping your original functionality */}
                    <div className="hidden">
                      <label className="block text-sm font-medium">
                        Preferred contact channel
                      </label>
                      <div className="mt-1 flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="facebook"
                            {...register("contactPreference")}
                            className="h-4 w-4"
                          />
                          <span className="ml-2">Facebook</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="twitter"
                            {...register("contactPreference")}
                            className="h-4 w-4"
                          />
                          <span className="ml-2">Twitter</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="instagram"
                            {...register("contactPreference")}
                            className="h-4 w-4"
                          />
                          <span className="ml-2">Instagram</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="whatsapp"
                            {...register("contactPreference")}
                            className="h-4 w-4"
                          />
                          <span className="ml-2">WhatsApp</span>
                        </label>
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium mb-1 text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          className={`w-full px-4 py-3 bg-white border rounded-lg ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="First name"
                          {...register("firstName")}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium mb-1 text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          className={`w-full px-4 py-3 bg-white border rounded-lg ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="Last name"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full px-4 py-3 bg-white border rounded-lg ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="youremail@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone - keeping your PhoneInput component */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Phone
                      </label>
                      {/* This is a placeholder for your actual PhoneInput component */}
                      <PhoneInput
                        {...register("phone")}
                        className={`w-full ps-3 py-2 bg-white border rounded-md outline-none ${
                          errors.phone
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                        defaultCountry="gb"
                        value={""}
                        onChange={() => {}}
                      />

                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Company and Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-medium mb-1 text-gray-700"
                        >
                          Company name
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          className={`w-full px-4 py-3 bg-white border rounded-lg ${
                            errors.companyName
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="e.g AI Solution"
                          {...register("companyName")}
                        />
                        {errors.companyName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium mb-1 text-gray-700"
                        >
                          Country
                        </label>
                        <input
                          id="country"
                          type="text"
                          className={`w-full px-4 py-3 bg-white border rounded-lg ${
                            errors.country
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="e.g United States"
                          {...register("country")}
                        />
                        {errors.country && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Job Title */}
                    <div>
                      <label
                        htmlFor="jobTitle"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Job Title
                      </label>
                      <input
                        id="jobTitle"
                        type="text"
                        className={`w-full px-4 py-3 bg-white border rounded-lg ${
                          errors.jobTitle ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="e.g Chief Technology Officer"
                        {...register("jobTitle")}
                      />
                      {errors.jobTitle && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.jobTitle.message}
                        </p>
                      )}
                    </div>

                    {/* Job Details */}
                    <div>
                      <label
                        htmlFor="jobDetails"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        How can we help you?
                      </label>
                      <textarea
                        id="jobDetails"
                        rows={5}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Tell us about your project or requirements..."
                        {...register("jobDetails")}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-400 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Keeping your verification and success stages as they are but with updated styling */}
                {formStage === "verification" && (
                  <div className="bg-white p-8 rounded-lg max-w-md mx-auto">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                      Email Verification
                    </h3>
                    <p className="mb-6 text-gray-600">
                      We've sent a verification code to{" "}
                      <span className="font-medium">email@example.com</span>.
                      Please enter the code below to verify your email address.
                    </p>

                    <form
                      className="space-y-6"
                      onSubmit={handleSubmitOtp(onVerifyOtp)}
                    >
                      <div>
                        <label
                          htmlFor="otp"
                          className="block text-sm font-medium mb-1 text-gray-700"
                        >
                          Verification Code
                        </label>
                        <input
                          id="otp"
                          type="text"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter verification code"
                          autoComplete="off"
                          {...registerOtp("otp")}
                          autoFocus
                        />
                        {otpErrors.otp && (
                          <p className="mt-1 text-sm text-red-600">
                            {otpErrors.otp.message}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          className="text-sm text-green-500 hover:text-green-600"
                          onClick={handleGetOTPCode}
                          disabled={resendDisabled || isGettingOtp}
                        >
                          {resendDisabled
                            ? `Resend code in ${countdown}s`
                            : isGettingOtp
                            ? "Sending..."
                            : "Resend code"}
                        </button>

                        <button
                          type="button"
                          className="text-sm text-gray-600 hover:text-gray-800"
                          onClick={handleGoBack}
                          disabled={isSubmittingOtp}
                        >
                          Go back
                        </button>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-green-400 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                          Verify & Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {formStage === "success" && (
                  <div className="bg-white p-8 rounded-lg max-w-md mx-auto text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                      Thank You!
                    </h3>
                    <p className="mb-8 text-gray-600">
                      Your message has been submitted successfully. Our team
                      will get back to you within 24 hours.
                    </p>
                    <button onClick={() => window.location.reload()} className="bg-green-400 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                      Submit Another Query
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Find quick answers to common questions about our services.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="border-b p-6">
                <h3 className="text-xl font-semibold mb-2">
                  What types of businesses do you work with?
                </h3>
                <p className="text-gray-600">
                  We work with businesses of all sizes across various
                  industries, including retail, healthcare, finance,
                  manufacturing, and more. Our AI solutions are tailored to meet
                  the specific needs of each client.
                </p>
              </div>

              <div className="border-b p-6">
                <h3 className="text-xl font-semibold mb-2">
                  How long does implementation typically take?
                </h3>
                <p className="text-gray-600">
                  Implementation timelines vary based on the complexity of your
                  needs and systems. Simple solutions can be deployed in a few
                  weeks, while more complex enterprise integrations may take 2-3
                  months. We'll provide a detailed timeline during your
                  consultation.
                </p>
              </div>

              <div className="border-b p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Do you offer custom AI solutions or just pre-built packages?
                </h3>
                <p className="text-gray-600">
                  We offer both. Our pre-built AI solutions can be quickly
                  deployed for common business needs, while our custom
                  development services create tailor-made solutions for unique
                  requirements or specialized industries.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  What kind of support do you provide after implementation?
                </h3>
                <p className="text-gray-600">
                  We provide ongoing support including 24/7 technical
                  assistance, regular maintenance updates, performance
                  monitoring, and continuous improvement recommendations. Our
                  support packages can be customized based on your needs.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Didn't find what you're looking for? Contact us directly.
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center text-green-500 font-bold hover:text-green-600 transition duration-300"
              >
                <FiMessageSquare className="mr-2" />
                Ask a Question
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-12">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold">Visit Our Office</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Schedule a visit to our headquarters to meet our team and see
                our AI solutions in action.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2294.094764569713!2d-1.485676272844301!3d54.90125892497884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e612d8af0739f%3A0x749d6e7d017f03c3!2z4YCG4YCU4YC64YC44YCS4YCr4YC44YCc4YCU4YC64YC4LCBTdW5kZXJsYW5kLCDhgJrhgLDhgJThgK3hgK_hgIDhgLrhgJDhgIDhgLrhgIDhgIThgLrhgLjhgJLhgJnhgLrhgLg!5e0!3m2!1smy!2s!4v1746337606899!5m2!1smy!2s" style={{border:0, width:"100%", height:"100%"}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">
                AI Solution Headquarters
              </h3>
              <p className="text-gray-600">
                123 AI Boulevard, Suite 500, San Francisco, CA 94103
              </p>
              <p className="text-gray-600 mt-2">
                Open Monday-Friday: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </div>
  );
};

export default ContactScreen;
