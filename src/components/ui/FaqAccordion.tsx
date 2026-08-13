"use client";

import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FaqItem({ question, answer, isOpen, onClick }: FaqItemProps) {
  return (
    <div 
      className={`bg-white border ${isOpen ? 'border-primary shadow-md' : 'border-gray-200 shadow-sm'} rounded-md p-6 hover:border-primary transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-black flex items-center gap-3">
          <span className="text-primary text-2xl">•</span> {question}
        </h3>
        <button 
          className="text-primary font-bold text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          aria-expanded={isOpen}
        >
          {isOpen ? "−" : "+"}
        </button>
      </div>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}
      >
        <div className="overflow-hidden">
          <p className="text-black leading-relaxed pl-7">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI CV parser work?",
      answer: "Our AI uses advanced Natural Language Processing to extract key information like skills, experience, and education from your uploaded CV. It then matches these data points against the requirements of active job postings to find the perfect fit."
    },
    {
      question: "Is the service free for candidates?",
      answer: "Yes, completely free! Candidates can create a profile, upload their CVs, and apply for jobs without any charges. We partner with companies who are looking for the best talent."
    },
    {
      question: "How long does the matching process take?",
      answer: "The matching is nearly instantaneous. Once your CV is uploaded and parsed (which takes seconds), you will immediately see a list of jobs that match your profile."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FaqItem 
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
