import React, { useRef } from "react";
import { MdFileDownload } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const WorkoutPlan = ({ plan }) => {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    try {
      const element = pdfRef.current;

      // Create a new PDF with proper margins
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 15; // 15mm margin on all sides
      const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;

      // Create a temporary div with print-specific styling
      const tempElement = document.createElement("div");
      tempElement.style.width = `${pageWidth}mm`;
      tempElement.style.padding = "20px";
      tempElement.style.backgroundColor = "white";
      tempElement.style.color = "black";
      tempElement.style.fontFamily = "Arial, sans-serif";
      tempElement.innerHTML = element.innerHTML;
      document.body.appendChild(tempElement);

      // Options for better image quality
      const options = {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "white",
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      };

      const dataUrl = await toPng(tempElement, options);
      document.body.removeChild(tempElement);

      // Calculate image dimensions
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

      // Split content across multiple pages if needed
      let heightLeft = pdfHeight;
      let position = margin;
      const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;

      pdf.addImage(
        dataUrl,
        "PNG",
        margin,
        position,
        pageWidth,
        pdfHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;

      // Add additional pages if content is too long
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(
          dataUrl,
          "PNG",
          margin,
          position,
          pageWidth,
          pdfHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
      }

      // Add page numbers
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pdf.internal.pageSize.getWidth() - margin,
          pdf.internal.pageSize.getHeight() - 10,
          { align: "right" }
        );
      }

      pdf.save("workout-plan.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (!plan || !plan.plan) {
    return (
      <div className="flex items-center justify-center min-h-90">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No workout plan found. Please generate a plan first.
        </p>
      </div>
    );
  }

  const { overview, schedule, tips, notes } = plan.plan;

  return (
    <div className="flex flex-col w-full min-h-90 overflow-hidden">
      <div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-4 mb-4">
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <MdFileDownload size={20} />
          Download PDF
        </button>
        <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
          <IoMdShare size={20} />
          Share
        </button>
      </div>
      <div ref={pdfRef} className="workout-plan-container md:px-8">
        <h1 className="text-2xl mt-6 font-bold mb-6 text-center">
          Your Personalized Workout Plan
        </h1>
        <hr className="border-gray-300 dark:border-gray-900 mb-6" />

        {/* Overview Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            📑 Workout Plan Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{overview}</p>
        </section>

        {/* Workout Schedule */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">📆 Workout Schedule</h2>
          {schedule.map((dayPlan, index) => (
            <div
              key={index}
              className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <h3 className="text-lg font-medium mb-2">
                {dayPlan.day}: {dayPlan.focus}
              </h3>

              {/* Warmup */}
              <div className="mb-4">
                <h4 className="font-medium mb-1">Warmup:</h4>
                <ul className="list-disc pl-5">
                  {dayPlan.warmup.map((exercise, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">
                      {exercise.name} - {exercise.duration}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exercises */}
              <div className="mb-4">
                <h4 className="font-medium mb-1">Exercises:</h4>
                <div className="space-y-3">
                  {dayPlan.exercises.map((exercise, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-700 p-3 rounded"
                    >
                      <p className="font-medium">{exercise.name}</p>
                      <p>
                        Sets: {exercise.sets} | Reps: {exercise.reps}
                      </p>
                      {exercise.notes && (
                        <p className="text-sm italic">
                          Notes: {exercise.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooldown */}
              <div>
                <h4 className="font-medium mb-1">❄️ Cooldown:</h4>
                <ul className="list-disc pl-5">
                  {dayPlan.cooldown.map((exercise, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">
                      {exercise.name} - {exercise.duration}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Tips Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            ✅ Tips & Recommendations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Fat Loss Tips</h3>
              <ul className="list-disc pl-5 space-y-1">
                {tips.fatLoss.map((tip, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">General Tips</h3>
              <ul className="list-disc pl-5 space-y-1">
                {tips.general.map((tip, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Notes Section */}
        {notes && notes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">⭕ Important Notes</h2>
            <ul className="list-disc pl-5 space-y-1">
              {notes.map((note, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">
                  {note}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Plan generated on:{" "}
          {new Date(plan?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;
