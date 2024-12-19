import React from "react";
import Image from "next/image";
import { Search, Heart, ShoppingCart, Bell } from "lucide-react";

const Header = () => (
  <header className="flex items-center justify-between p-4 bg-white border-b">
    <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold text-black">Edu-Bridge</h1>{" "}
      <span className="text-sm text-black">Categories</span>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for anything"
          className="w-[480px] py-2 px-4 border rounded-full text-sm"
        />
        <Search className="absolute right-3 top-2.5 text-black w-5 h-5" />
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-sm text-black">My learning</span>
      <Heart className="w-6 h-6 text-black" />
      <ShoppingCart className="w-6 h-6 text-black" />
      <Bell className="w-6 h-6 text-black" />
      <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
        HG
      </div>
    </div>
  </header>
);

const Navigation = () => (
  <nav className="bg-black text-white p-4">
    <h1 className="text-3xl font-bold mb-4">My learning</h1>
    <ul className="flex space-x-6">
      <li className="border-b-2 border-white pb-2">All courses</li>
      <li>My Lists</li>
      <li>Wishlist</li>
      <li>Archived</li>
      <li>Learning tools</li>
    </ul>
  </nav>
);


const CourseCard = ({ image, title, author, progress, rating }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-40">
      <Image src={image} alt={title} layout="fill" objectFit="cover" />
      <button className="absolute top-2 right-2 bg-white rounded-full p-1">
        <span className="text-xl">⋮</span>
      </button>
    </div>
    <div className="p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-black mb-2">{author}</p>
      <div className="flex items-center mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600 ml-2">{progress}%</span>
      </div>
      <div className="flex items-center">
        {rating ? (
          <>
            <div className="text-yellow-400">{"★".repeat(rating)}</div>
            <span className="text-sm text-black ml-2">Your rating</span>
          </>
        ) : (
          <button className="text-sm text-purple-600">Leave a rating</button>
        )}
      </div>
    </div>
  </div>
);

const MyLearning = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* <ScheduleCard /> */}
        <div className="text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <CourseCard
            image="/images/course-3.jpg"
            title="Basic Computer Skills and Typing"
            author="Lutfi Adi"
            progress={1}
          />
          <CourseCard
            image="/images/english-speaking.jpg"
            title="Basic English Speaking"
            author="Taylor Eve"
            progress={16}
            rating={4}
          />
          <CourseCard
            image="/images/course-2.jpg"
            title="Tailoring and Sewing"
            author="John Doe"
            progress={15}
          />
          <CourseCard
            image="/images/mobile-repairing.jpg"
            title="Mobile Repairing and Servicing"
            author="Surya Intan"
            progress={0}
          />
        </div>
      </main>
    </div>
  );
};

export default MyLearning;
