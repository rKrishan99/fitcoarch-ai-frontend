import React from "react";

const TestimonialsSection = () => {
  return (
    <div className="overflow-hidden bg-background-500 dark:bg-backgroundDark-400 px-[30px] xl:px-[120px] py-20">
      <h1 className="text-4xl font-semibold text-center">
        What Our Users Are Saying{" "}
      </h1>
      <div className="flex flex-col md:flex-row  mt-10 justify-center items-center gap-8">
        <div
          data-aos="fade-right"
          data-aos-duration="1200"
          data-aos-delay="200"
          data-aos-easing="ease-in"
          className="bg-background-400 dark:bg-backgroundDark-300 p-8 rounded-lg max-w-[400px]"
        >
          <p className="text-center">
            "I’ve never been this consistent with workouts! The AI advice is a
            game changer."
          </p>
          <div className="flex justify-end mt-2">
            <span>— Sarah M.</span>
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1200"
          data-aos-delay="200"
          data-aos-easing="ease-in"
          className="bg-background-400 dark:bg-backgroundDark-300 p-8 rounded-lg max-w-[400px]"
        >
          <p className="text-center">
            "Helps me eat better and stay on track without a real coach."
          </p>
          <div className="flex justify-end mt-2">
            <span>— Daniel K.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
