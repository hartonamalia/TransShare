import React from "react";
import naomiImage from "../../assets/naomi.jpg";
import mariaImage from "../../assets/maria.jpg";
import edwardImage from "../../assets/edward.jpg";

const feedbackData = [
  {
    name: "Naomi Russo",
    image: naomiImage,
    description:
      "I had a fantastic experience renting this car. Amalia was very communicative and flexible with the pickup and drop-off times.",
    aosDelay: "0",
  },
  {
    name: "Maria Popescu",
    image: mariaImage,
    description: "Great service, I will definitely come back!",
    aosDelay: "300",
  },
  {
    name: "Edward Newgate",
    image: edwardImage,
    description: "The car was clean and exactly as advertised. I felt comfortable renting from Andrei and would do so again. Highly recommended!",
    aosDelay: "1000",
  },
];
const Feedback = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl "
            >
              What our customers say
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {feedbackData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center cursor-pointer">
                  <img src={skill.image} alt={skill.name} className="rounded-full w-20 h-20" />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{skill.description}</p>
                <p className="text-center font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
