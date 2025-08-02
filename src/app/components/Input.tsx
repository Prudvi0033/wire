"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Montserrat } from "next/font/google";

const monte = Montserrat({subsets: ['latin']})

const Input = () => {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to content height
    }
  }, [prompt]);

  const handleApi = async (prompt: string) => {
    const response = await axios.post("/api/gemini", {
      prompt,
    });
    return response.data.response;
  };

  const { data, isPending, isError, mutate, isPaused } = useMutation({
    mutationFn: handleApi,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(prompt);
  };

  return (
    <div className="flex items-center flex-col gap-4 justify-center h-screen overflow-y-auto p-4">
      <form
        onSubmit={handleSubmit}
        className={`flex relative flex-col w-full gap-4 max-w-[35rem] ${monte.className}`}
      >
        <div className="border p-2 rounded-xl bg-neutral-800/70 border-neutral-700 backdrop-blur-2xl shadow-[inset_1px_1px_2px_#2a2a2a,_4px_4px_12px_rgba(0,0,0,0.4)]">
          <textarea
            ref={textareaRef}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            placeholder="Ask anything"
            className="w-full text-sm text-white bg-transparent p-2 rounded-xl  focus:outline-none resize-none overflow-hidden"
          />

          <div className="flex items-center justify-between">
            <div></div>
            <button
            type="submit"
            disabled={isPending}
            className={`bg-purple-700  p-2  rounded-lg ${
              isPending || isPaused ? "cursor-wait" : "cursor-pointer"
            }`}
          >
            <MdArrowOutward />
          </button>
          </div>
        </div>

        {isError && (
          <p className="mt-4 text-red-600">
            Something went wrong. Please try again.
          </p>
        )}

        {data && (
          <div className="mt-6 p-4  border rounded">
            <h3 className="font-semibold mb-2">Gemini Response:</h3>
            <p className="max-w-[30rem] max-h-48 overflow-y-auto">{data}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Input;
