"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const Input = () => {
  const [prompt, setPrompt] = useState("");

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
    <div className="flex items-center flex-col gap-4 justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything"
          value={prompt}
          className="border border-neutral-700 px-4 py-2 text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className={`bg-purple-700 p-2 rounded-lg ${
            isPending || isPaused ? "cursor-wait" : "cursor-pointer"
          }`}
        >
          <MdArrowOutward />
        </button>

        {isError && (
          <p className="mt-4 text-red-600">
            Something went wrong. Please try again.
          </p>
        )}

        {data && (
          <div className="mt-6 p-4  border rounded">
            <h3 className="font-semibold mb-2">Gemini Response:</h3>
            <p className=" truncate max-w-[30rem] h-48">{data}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Input;
