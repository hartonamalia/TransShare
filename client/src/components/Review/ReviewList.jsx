import React from "react";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    id: 1,
    name: "Amalia",
    date: "19 April 2023",
    comment:
      "It was popularised in the 1960s with the release of Letraset sheets...",
    ratings: {
      quality: 5,
      price: 5,
      comfort: 5,
      driving: 5,
    },
  },
  {
    id: 2,
    name: "Maya",
    date: "02 Feb 2024",
    comment:
      "It was popularised in the 1960s with the release of Letraset sheets...",
    ratings: {
      quality: 5,
      price: 4,
      comfort: 5,
      driving: 5,
    },
  },
];

const ReviewsList = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6">Reviews({reviews.length})</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {/* add a new review */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Leave a Reply</h3>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              required
              className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label
              htmlFor="emailAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="emailAddress"
              required
              className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Comments
            </label>
            <textarea
              id="comment"
              rows={4}
              className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          {/* <div className="text-right">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Review
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ReviewsList;
