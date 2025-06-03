import React from "react";
import images from "../../assets/images/images";

const Footer = () => {
  return (
    <div className="overflow-hidden bg-backgroundLight-500 dark:bg-backgroundDark-400 px-[30px] xl:px-[120px] py-20 md:h-[450px] drop-shadow-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center justify-center">
            <img src={images.fitcoachModalLogo} className="w-50" alt="logo" />
          </div>
          <p>
            Your personal AI-powered fitness companion. Get custom workout
            plans, track your progress, and chat with our smart assistant — all
            in one place.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/workout" className="hover:underline">
                Workout Plans
              </a>
            </li>
            <li>
              <a href="/chatbot" className="hover:underline">
                AI Coach
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://firebase.google.com/"
                target="_blank"
                className="hover:underline"
              >
                Firebase
              </a>
            </li>
            <li>
              <a
                href="https://ai.google.dev/"
                target="_blank"
                className="hover:underline"
              >
                Gemini AI
              </a>
            </li>
            <li>
              <a
                href="https://graphql.org/"
                target="_blank"
                className="hover:underline"
              >
                GraphQL
              </a>
            </li>
            <li>
              <a
                href="https://www.mongodb.com/"
                target="_blank"
                className="hover:underline"
              >
                MongoDB
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:support@fitcoachai.com"
                className="hover:underline"
              >
                support@fitcoachai.com
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/yourusername/fitcoach-ai"
                target="_blank"
                className="hover:underline"
              >
                /fitcoach-ai
              </a>
            </li>
            <li>Location: Remote 🌍</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} FitCoach AI. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
