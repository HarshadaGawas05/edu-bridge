"use client"; // Mark this file as a Client Component

import React, { useState } from "react";
import {
  Star,
  Bookmark,
  ChevronDown,
  ShoppingCart,
  Search,
} from "lucide-react";
import Image from "next/image";

export default function Component() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    education: "",
    skillLevel: "",
  });
  const [enrollError, setEnrollError] = useState(null); // State for enrollment error

  const courses = [
    {
      id: 1,
      title: "Basic English Speaking",
      description: "Develop conversational English skills.",
      instructor: "Taylor Eve",
      rating: 4.97,
      reviews: 223,
      price: 0,
      image: "/images/english-speaking.jpg",
      youtubeLink: "https://www.youtube.com/watch?v=E1vep4gWqdg",
    },
    {
      id: 2,
      title: "Basic Computer Skills & Typing",
      description:
        "Learn essential computer skills, including typing and internet browsing.",
      instructor: "Lutfi Adi",
      rating: 4.92,
      reviews: 252,
      price: 0,
      image: "/images/course-3.jpg",
    },
    {
      id: 3,
      title: "Tailoring and Sewing",
      description: "Master the art of stitching and tailoring clothes.",
      instructor: "John Doe",
      rating: 4.98,
      reviews: 213,
      price: 0,
      image: "/images/course-2.jpg",
    },
    {
      id: 4,
      title: "Pottery and Handicrafts",
      description: "Learn the craft of pottery and traditional handicrafts.",
      instructor: "Mega Tri",
      rating: 4.99,
      reviews: 132,
      price: 0,
      image: "/images/pottery.jpg",
    },
    {
      id: 5,
      title: "Agriculture and Sustainable Farming",
      description: "Improve your farming skills with sustainable techniques.",
      instructor: "Keith Kinzie",
      rating: 4.98,
      reviews: 184,
      price: 0,
      image: "/images/agriculture-farming.jpg",
    },
    {
      id: 6,
      title: "Mobile Repairing and Servicing",
      description: "Become skilled at mobile phone repairing and servicing.",
      instructor: "Surya Intan",
      rating: 4.97,
      reviews: 212,
      price: 0,
      image: "/images/mobile-repairing.jpg",
    },
  ];

  // Function to get CSRF token from cookies
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if this cookie string begins with the name we want
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // Get CSRF token from cookie
  function getCSRFToken() {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + "csrftoken" + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  }

  const handleEnroll = async (course) => {
    // Form validation
    if (!userData.name || !userData.education || !userData.skillLevel) {
      setEnrollError("Please fill in all required fields.");
      return;
    }

    // Get auth token from localStorage
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setEnrollError("Please log in to enroll in courses.");
      return;
    }

    // Get CSRF token
    const csrfToken = getCSRFToken();

    // Prepare the enrollment data matching Django backend expectations
    const enrollmentData = {
      name: userData.name,
      education: userData.education,
      skill_level: userData.skillLevel.toLowerCase(), // Convert to match backend expectation
      course_id: course.id,
      enrollment_date: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/course/${course.id}/enroll/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify(enrollmentData),
          credentials: "include", // Important for sending cookies
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Enrollment failed");
      }

      const data = await response.json();

      if (data.enrollment_id) {
        // Successful enrollment
        setEnrollError(null);
        // Initialize progress tracking
        await initializeProgress(data.enrollment_id, course.id);
        // You might want to show a success message or redirect
        return true;
      } else {
        setEnrollError(data.error || "Enrollment failed.");
        return false;
      }
    } catch (error) {
      setEnrollError(error.message || "An error occurred during enrollment.");
      console.error("Error enrolling in course:", error);
      return false;
    }
  };

  // Function to initialize progress tracking
  const initializeProgress = async (enrollmentId, courseId) => {
    const token = localStorage.getItem("auth_token");
    const csrfToken = getCSRFToken();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/course/progress/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify({
            enrollment_id: enrollmentId,
            course_id: courseId,
            progress: 0,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Failed to initialize progress tracking");
      }
    } catch (error) {
      console.error("Error initializing progress:", error);
    }
  };

  // Update the modal confirmation handler
  const handleModalConfirm = async () => {
    const success = await handleEnroll(selectedCourse);
    if (success) {
      // Show success message
      toast.success("Successfully enrolled in the course!");
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value })); // Update userData state
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    console.log("Opening modal for course:", course); // Debugging output
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/placeholder.svg"
              alt="EduBridge Logo"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
            <nav className="hidden md:flex space-x-8 ml-10">
              <a
                href="#"
                className="text-gray-900 hover:text-black font-semibold"
              >
                Explore Courses
              </a>
              <a
                href="#"
                className="text-gray-900 hover:text-black font-semibold"
              >
                Webinars
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="What would you like to learn today?"
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
            <a
              href="#"
              className="text-gray-900 hover:text-black mr-4 font-semibold"
            >
              My Learning
            </a>
            <ShoppingCart className="h-6 w-6 text-gray-900 mr-4" />
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Featured Courses
        </h1>
        <div className="flex">
          <aside className="w-64 mr-8">
            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <h2 className="font-semibold text-lg mb-4 text-gray-900">
                Filters
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-gray-900">
                    All Courses
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-gray-900 hover:text-black">
                        Recommended Courses
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-900 hover:text-black">
                        Career Path Packages
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-200">
                  Featured
                </button>
                <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-200">
                  Free Courses
                </button>
                <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-200">
                  Highly Rated
                </button>
              </div>
              <button className="flex items-center text-sm font-medium text-gray-900">
                Sort by
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <a
                    href={course.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover cursor-pointer"
                      onError={(e) => {
                        e.target.onerror = null; // prevents looping
                        e.target.src = "/placeholder.png"; // placeholder image
                      }}
                    />
                  </a>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      {course.description}
                    </p>
                    <p className="text-sm text-gray-900 mb-2">
                      {course.instructor}
                    </p>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 mr-1">
                        {course.rating}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        ({course.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold text-gray-900">Free</span>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
                        onClick={() => openModal(course)}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Enrollment Confirmation Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-black text-lg font-semibold mb-4">
              Confirm Enrollment
            </h2>
            <p className="text-black">
              Are you sure you want to enroll in{" "}
              <strong>{selectedCourse.title}</strong>?
            </p>
            {/* Input fields for user data */}
            <div className="mt-4 text-black">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={userData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                name="education"
                placeholder="Your Education"
                value={userData.education}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full mb-2"
                required
              />
              {/* Skill Level Dropdown */}
              <select
                name="skillLevel"
                value={userData.skillLevel}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full mb-2"
                required
              >
                <option value="">Select your skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleEnroll(selectedCourse); // Call enroll function on confirm
                  closeModal(); // Close modal after enrollment
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
