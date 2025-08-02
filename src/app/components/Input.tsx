"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import ShimmerText from "./ShimmerText";

const monte = Montserrat({ subsets: ["latin"] });

const Input = () => {
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleApi = async (prompt: string) => {
    const response = await axios.post("/api/gemini", { prompt });
    return response.data.response;
  };

  const { data, isPending, mutate, isPaused } = useMutation({
    mutationFn: handleApi,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setText(prompt);
    mutate(prompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen w-full flex justify-center items-center px-4 py-6"
    >
      <div className="relative h-full w-full max-w-[40rem]">
        {/* Scrollable content area */}
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="overflow-y-auto pb-32 h-full pr-1"
        >
          {text && (
            <div className="ml-auto bg-neutral-800/70 border border-neutral-800 w-fit px-2 py-1 mb-4 rounded-4xl text-sm text-white">
              {text}
            </div>
          )}

          {isPending ? (
            <div className="text-xs text-right pr-2 text-white mb-4">
              <ShimmerText>Generating response...</ShimmerText>
            </div>
          ) : (
            data && (
              <div className="w-fit mb-4 text-white">
                <div className="bg-neutral-800/70 border border-neutral-800 px-2 py-1 rounded-2xl">
                  {data}
                </div>
              </div>
            )
          )}
        </div>

        {/* Fixed textarea at bottom */}
        <form
          onSubmit={handleSubmit}
          className="absolute bg-neutral-800/700 bottom-0 left-0 w-full"
        >
          <div className="border p-2 rounded-xl bg-neutral-800/70 border-neutral-700 backdrop-blur-2xl shadow-[inset_1px_1px_2px_#2a2a2a,_4px_4px_12px_rgba(0,0,0,0.4)] flex flex-col gap-2">
            <textarea
              ref={textareaRef}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder="Ask anything"
              className="w-full text-sm text-white bg-transparent p-2 rounded-xl focus:outline-none resize-none overflow-hidden"
            />
            <div className="flex items-center justify-between">
              <div />
              <button
                type="submit"
                disabled={isPending}
                className={`bg-purple-700 p-2 rounded-lg transition-opacity ${
                  isPending || isPaused
                    ? "cursor-wait opacity-60"
                    : "cursor-pointer"
                }`}
              >
                <MdArrowOutward />
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Input;
