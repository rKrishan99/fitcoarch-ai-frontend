import React, { useContext } from "react";
import images from "../../assets/images/images";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ModalContext } from "../../context/ModalContext";

const HeroSection = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { setVisibleSignUp, setVisibleLogin } = useContext(ModalContext);

  const handleGetStart = () => {
    if (authInfo) {
      navigate("/user-dashboard");
    } else {
      setVisibleSignUp(true);
    }
  };
  return (
    <div className="flex flex-col justify-center w-full items-center bg-gradient-to-r from-[#CCFBF1] via-[#FAF2C9] to-[#BFD4F9] dark:from-[#43524f] dark:via-[#605e4c] dark:to-[#4b5360] overflow-hidden">
      <div className="relative py-40">
        <div className="flex flex-col justify-center w-full items-center px-[30px] md:px-[120px]">
          <h1
            data-aos="fade-down"
            data-aos-duration="1200"
            data-aos-delay="200"
            data-aos-easing="ease-in"
            className="text-3xl z-40 md:text-5xl: lg:text-6xl xl:w-[1100px] font-bold text-center"
          >
            Transform Your Fitness Journey with Smart Guidance
          </h1>
          <p
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
            data-aos-easing="ease-in"
            className="mt-5 z-40 md:mt-10 text-md text-gray-800 dark:text-gray-200 text-center"
          >
            AI-powered personal training. Workout plans, nutrition tracking, and
            expert advice — all in one app.
          </p>
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
            data-aos-easing="ease-in"
            className="mt-10 md:mt-20 flex flex-col md:flex-row gap-6 "
          >
            <button
              onClick={handleGetStart}
              className="bg-primary-400 z-50 hover:bg-primary-500 text-white px-10 py-4 rounded-lg cursor-pointer font-bold"
            >
              Get Started
            </button>

            {!authInfo &&
              (setVisibleLogin,
              (
                <button
                  onClick={() => setVisibleLogin(true)}
                  className="border-2 z-40 border-primary-400 hover:border-primary-500 text-primary-400 hover:text-primary-500 px-15 py-4 rounded-lg cursor-pointer font-bold"
                >
                  Login
                </button>
              ))}
          </div>
        </div>
        <img
          data-aos="fade-left"
          data-aos-duration="1200"
          data-aos-delay="200"
          data-aos-easing="ease-in"
          className="absolute w-[150px] md:w-[250px] xl:w-[400px] right-8 bottom-0"
          src={images.heroImg1}
          alt="workout"
        />
        <img
          data-aos="fade-right"
          data-aos-duration="1200"
          data-aos-delay="200"
          data-aos-easing="ease-in"
          className="absolute w-[150px] md:w-[250px] xl:w-[350px] left-4 bottom-0"
          src={images.heroImg2}
          alt="banner"
        />
      </div>
    </div>
  );
};

export default HeroSection;
