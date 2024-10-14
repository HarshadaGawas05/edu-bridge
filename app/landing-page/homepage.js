import React from "react";
import { Search, Menu } from "lucide-react";
import Image from "next/image";

export default function EducaLandingPage() {
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
              <a href="#" className="text-black hover:text-gray-900">
                Categories
              </a>
              <a href="#" className="text-black hover:text-gray-900">
                Courses
              </a>
              <a href="#" className="text-black hover:text-gray-900">
                About Us
              </a>
              <a href="#" className="text-black hover:text-gray-900">
                Mentors
              </a>
              <a href="#" className="text-black hover:text-gray-900">
                Blog
              </a>
              <a href="#" className="text-black hover:text-gray-900">
                Contacts
              </a>
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
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800">
              Login
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-8xl mb-4 text-black">
              <span className="font-normal">Learning with</span>
              <br />
              <span className="font-bold">EDU-BRIDGE</span>
            </h2>

            <p className="text-gray-600 mb-6">
              Take advantage of our courses advance your career.
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
          <h3 className="text-2xl font-bold mb-8 text-black">Popular Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={`/images/course-${i}.jpg`} // Updated to .jpg images
                  alt={`Course ${i}`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold mb-2">Course Title {i}</h4>
                  <p className="text-sm text-gray-600">
                    Course description goes here...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
