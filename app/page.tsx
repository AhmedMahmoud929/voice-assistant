"use client";
import { fadeInUp } from "@/lib/animationVariants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import "./globals.css";
import { Message } from "@/lib/types";

function Page() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState("");
  const [modelResponse, setModelResponse] = useState("");
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRecording) {
      videoRef.current?.play();
      setIsLoading(false);
      setModelResponse("");

      // Access the microphone and start recording
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          const chunks: Blob[] = [];
          recorder.ondataavailable = (event) => chunks.push(event.data);

          recorder.onstop = () => {
            const collectedBlob = new Blob(chunks, { type: "audio/wav" });
            setAudioBlob(collectedBlob);
            const collectedAudio = URL.createObjectURL(collectedBlob);
            setAudioURL(collectedAudio);

            // Send audio to the backend
            sendAudioToBackend(collectedBlob);
          };

          recorder.start();
        })
        .catch((err) => console.error("Microphone access denied:", err));
    } else if (mediaRecorder) {
      // Stop recording when `isRecording` becomes false
      videoRef.current?.pause();
      mediaRecorder.stop();
      setIsLoading(true);
    }
  }, [isRecording]);

  const sendAudioToBackend = async (audioFile: Blob) => {
    try {
      // Update message history
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", content: "Audio message" },
      ]);
      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTo({ top: Number.MAX_SAFE_INTEGER });
        }
      }, 10);

      const formData = new FormData();
      formData.append("userAudio", audioFile);
      formData.append("messageHistory", JSON.stringify(messageHistory));

      const res = await fetch("/api/gemini", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload audio");
      }

      const data = await res.json();
      setModelResponse(data.response);

      // Update message history
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", content: data.response },
      ]);

      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTo({ top: Number.MAX_SAFE_INTEGER });
        }
      }, 10);

      console.log("Audio uploaded successfully");
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[rgb(204,204,204)]">
      {/* RESPONSE */}
      <div
        className="flex-1 overflow-x-auto pt-20 bg-[rgb(209,209,209)] flex flex-col justify-center items-center overflow-y-auto p-4"
        ref={chatBoxRef}
      >
        {messageHistory.map((message, index) => (
          <motion.div
            key={index}
            className={`max-w-4xl w-full mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.content}
            </span>
          </motion.div>
        ))}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className={`max-w-4xl w-full mb-4 ${"text-left"}`}
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <span
                className={`inline-block p-2 rounded-lg ${"bg-gray-300 text-black"}`}
              >
                Thinking...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isRecording && (
            <motion.h1
              className="text-3xl hidden"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
            >
              Listening...
            </motion.h1>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isLoading && (
            <motion.h1
              className="text-3xl hidden"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
            >
              Thinking...
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* RECORDING */}
      <div className="relative h-[225px] mb-5 flex justify-center items-center ">
        <span
          className={cn(
            "z-20 w-[125px] h-[125px] rounded-full border-white border-[15px] cursor-pointer duration-300",
            isRecording
              ? "opacity-20 scale-125 shadow-lg shadow-black/20"
              : "opacity-0"
          )}
          onClick={() => setIsRecording(!isRecording)}
        ></span>

        <video
          ref={videoRef}
          className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10"
          width="300px"
          muted
        >
          <source src="/siri-wave.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Page;
