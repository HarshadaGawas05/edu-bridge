// EnrollModal.js
import React, { useState } from "react";

const EnrollModal = ({ isOpen, onClose, onEnroll }) => {
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnroll({ name, education });
    onClose(); // Close the modal after enrollment
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Enroll in Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="education">
              Education Details:
            </label>
            <input
              type="text"
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollModal;
