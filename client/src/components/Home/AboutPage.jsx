import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-violet-500">About TransShare</h1>
        <p className="text-lg text-center mb-12 text-gray-700 leading-relaxed">
          Welcome to TransShare, a web application designed to facilitate the temporary sharing of private cars between users. Our platform connects car owners with individuals who need a car for a short period, making it easy and convenient for both parties to share resources.
        </p>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-violet-500">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At TransShare, our mission is to create a community-driven car-sharing network that promotes sustainability, reduces the number of unused vehicles, and provides an affordable alternative to car ownership. We believe in the power of sharing and aim to make transportation more accessible for everyone.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-violet-500">How It Works</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-violet-500">For Car Owners:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
                <li>Create an Account: Sign up on TransShare and create your profile.</li>
                <li>List Your Vehicle: Provide details about your car, including make, model, year, transmission type, fuel type, and availability. Upload high-quality photos to attract potential renters.</li>
                <li>Set Your Terms: Define the rental price, availability, and any specific terms or conditions for renting your car.</li>
                <li>Approve Requests: Review and approve rental requests from users. You can communicate with potential renters through the in-app chat to clarify any details.</li>
                <li>Hand Over the Keys: Arrange a meeting point with the renter to hand over the keys and complete the rental process.</li>
                <li>Earn Money: Earn money for each rental period, directly deposited into your account.</li>
              </ol>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-violet-500">For Renters:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
                <li>Create an Account: Sign up on TransShare and create your profile.</li>
                <li>Search for Cars: Use our search filters to find a car that suits your needs based on location, make, model, price, and other preferences.</li>
                <li>Send a Request: Submit a rental request to the car owner, specifying the desired rental period.</li>
                <li>Get Approved: Once the owner approves your request, use the in-app chat to arrange a meeting point and clarify any details.</li>
                <li>Enjoy the Ride: Use the car for the agreed period, adhering to the terms and conditions set by the owner.</li>
                <li>Return the Car: Return the car to the owner at the agreed location and time.</li>
                <li>Leave Feedback: After the rental period, provide feedback on the car and the owner to help build a trustworthy community.</li>
              </ol>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-violet-500">Benefits of Using TransShare</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>Convenience: Easily find and rent a car for short periods without the hassle of traditional car rentals.</li>
            <li>Affordability: Save money compared to owning a car or using conventional car rental services.</li>
            <li>Sustainability: Reduce the environmental impact by sharing resources and minimizing the number of unused vehicles.</li>
            <li>Community: Join a community of like-minded individuals who believe in the power of sharing and sustainable living.</li>
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-violet-500">Safety and Trust</h2>
          <p className="text-lg mb-4 text-gray-700 leading-relaxed">
            TransShare is committed to providing a safe and trustworthy platform for our users. We implement the following measures to ensure a secure experience:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>Verified Profiles: All users must verify their identities before participating in car sharing.</li>
            <li>Ratings and Reviews: Both car owners and renters can leave ratings and reviews after each rental, helping to build trust within the community.</li>
            <li>Insurance: We offer optional insurance coverage to protect both parties during the rental period.</li>
            <li>24/7 Support: Our support team is available around the clock to assist with any issues or concerns.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-4 text-violet-500">Join Us Today!</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you have a car that you rarely use or need a vehicle for a short period, TransShare is the perfect solution for you. Join our community today and experience the benefits of car sharing!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
