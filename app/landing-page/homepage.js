"use client"; // Add this line

import React, { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../hooks/AuthProvider"; // Import the custom hook

const courses = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Learn to build responsive websites using HTML, CSS, and JavaScript.",
    image: `/images/course-1.jpg`,
  },
  {
    id: 2,
    title: "Sewing & Tailoring",
    description:
      "Master the art of sewing and tailoring to create your own garments and unique fashion pieces.",
    image: `/images/course-2.jpg`,
  },
  {
    id: 3,
    title: "Basic Computer Skills",
    description:
      "Gain essential computer skills to enhance productivity, including word processing, spreadsheets, and internet navigation",
    image: `/images/course-3.jpg`,
  },
];

export default function EducaLandingPage() {
  const { user, handleGoogleSignIn, handleLogout } = useAuth(); // Destructure auth functions from context

  const getInitials = (name) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-black">Edu-Bridge</h1>
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <button className="text-gray-600 hover:text-gray-900">
                <Menu className="h-6 w-6" />
              </button>
              <Link href="#" className="text-black hover:text-gray-900">
                Categories
              </Link>
              <Link href="/courses" className="text-black hover:text-gray-900">
                Courses
              </Link>
              <Link href="#" className="text-black hover:text-gray-900">
                About Us
              </Link>
              <Link href="#" className="text-black hover:text-gray-900">
                Mentors
              </Link>
              <Link href="#" className="text-black hover:text-gray-900">
                Blog
              </Link>
              <Link href="#" className="text-black hover:text-gray-900">
                Contacts
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search any course"
                className="w-64 pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800"
              onClick={user ? handleLogout : handleGoogleSignIn} // Change function based on login state
            >
              {user ? "Logout" : "Login"}{" "}
              {/* Change button text based on login state */}
            </button>
            {user && ( // Only show user profile link if user is logged in
              <Link
                href="/user-profile" // Redirect to the user profile page
                className="flex items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800"
              >
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(user.displayName || user.email)}{" "}
                  {/* Display initials from user's name or email */}
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-7xl mb-4 text-black">
              <span className="font-normal">Learning with</span>
              <br />
              <span className="font-bold">EDU-BRIDGE</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Take advantage of our courses to advance your career.
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-grow px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2 md:mb-0"
              />
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800">
                14 Days Trial
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-purple-500 rounded-full p-4 h-full w-full">
              <Image
                src="/images/student.jpg" // Path to your image
                alt="Student"
                layout="responsive" // This ensures the image fills the container
                width={400} // Adjust width to fit the column better
                height={400} // Adjust height to fit the column better
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-black">
            Popular Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={course.image} // Use the image path from the course object
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold mb-2 text-black">{course.title}</h4>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
