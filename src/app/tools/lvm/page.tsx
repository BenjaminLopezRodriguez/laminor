"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card } from "~/components/ui/card";
import { Send, Loader2, Video, MessageSquare, Sparkles, Play } from "lucide-react";
import NavigationHero from "~/app/_components/navigationhero";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  timestamps?: TimestampMarker[];
}

interface TimestampMarker {
  time: string; // Original format like "3:10:12"
  seconds: number; // Converted to seconds
  thumbnail?: string; // Base64 thumbnail URL
}

export default function LargeVideoModelDemo() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Parse timestamp string (HH:MM:SS or MM:SS) to seconds
  const parseTimestampToSeconds = (timeString: string): number => {
    const parts = timeString.split(":").map(Number).filter((n) => !isNaN(n));
    if (parts.length === 3) {
      // HH:MM:SS
      return (parts[0] ?? 0) * 3600 + (parts[1] ?? 0) * 60 + (parts[2] ?? 0);
    } else if (parts.length === 2) {
      // MM:SS
      return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
    } else if (parts.length === 1) {
      // SS
      return parts[0] ?? 0;
    }
    return 0;
  };

  // Extract timestamps from text content
  const extractTimestamps = (content: string): TimestampMarker[] => {
    const timestampRegex = /<timestamp>([\d:]+)<\/timestamp>/g;
    const matches = Array.from(content.matchAll(timestampRegex));
    return matches
      .map((match) => {
        const timeStr = match[1];
        if (!timeStr) return null;
        return {
          time: timeStr,
          seconds: parseTimestampToSeconds(timeStr),
        };
      })
      .filter((ts): ts is TimestampMarker => ts !== null);
  };

  // Generate thumbnail from video at specific time
  const generateThumbnail = async (timeInSeconds: number): Promise<string | null> => {
    if (!videoRef.current || !videoUrl) return null;

    return new Promise((resolve) => {
      const video = videoRef.current;
      if (!video) {
        resolve(null);
        return;
      }

      // Wait for video metadata to load
      const tryGenerate = () => {
        if (video.readyState < 2) {
          // Not enough data loaded yet
          video.addEventListener("loadeddata", tryGenerate, { once: true });
          return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }

        const currentTime = video.currentTime;
        const wasPlaying = !video.paused;

        // Pause video if playing
        if (wasPlaying) {
          video.pause();
        }

        // Seek to timestamp
        video.currentTime = timeInSeconds;

        const onSeeked = () => {
          // Set canvas dimensions
          canvas.width = video.videoWidth || 320;
          canvas.height = video.videoHeight || 180;

          // Draw frame
          try {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            // Convert to base64
            const thumbnail = canvas.toDataURL("image/jpeg", 0.8);
            
            // Restore video state
            video.currentTime = currentTime;
            if (wasPlaying) {
              video.play();
            }

            video.removeEventListener("seeked", onSeeked);
            resolve(thumbnail);
          } catch (error) {
            video.removeEventListener("seeked", onSeeked);
            resolve(null);
          }
        };

        video.addEventListener("seeked", onSeeked, { once: true });

        // Timeout fallback
        setTimeout(() => {
          video.removeEventListener("seeked", onSeeked);
          resolve(null);
        }, 3000);
      };

      tryGenerate();
    });
  };

  // Jump to timestamp in video
  const jumpToTimestamp = async (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  // Process message content and extract timestamps with thumbnails
  const processMessageContent = async (content: string): Promise<TimestampMarker[]> => {
    const timestamps = extractTimestamps(content);
    
    // Generate thumbnails for each timestamp
    const timestampsWithThumbnails = await Promise.all(
      timestamps.map(async (ts) => {
        const thumbnail = await generateThumbnail(ts.seconds);
        return { ...ts, thumbnail: thumbnail || undefined };
      })
    );

    return timestampsWithThumbnails;
  };

  // Render message content with clickable timestamps
  const renderMessageContent = (content: string, timestamps?: TimestampMarker[]) => {
    const parts: (string | TimestampMarker)[] = [];
    let lastIndex = 0;
    const timestampRegex = /<timestamp>([\d:]+)<\/timestamp>/g;
    let match: RegExpExecArray | null;

    while ((match = timestampRegex.exec(content)) !== null) {
      // Add text before timestamp
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      // Find corresponding timestamp marker
      const timeStr = match[1];
      if (timeStr) {
        const timestampMarker = timestamps?.find((ts) => ts.time === timeStr);
        if (timestampMarker) {
          parts.push(timestampMarker);
        }
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    // If no timestamps found, return original content
    if (parts.length === 0) {
      return <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>;
    }

    return (
      <div className="text-sm leading-relaxed whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (typeof part === "string") {
            return <span key={index}>{part}</span>;
          } else {
            // Render timestamp marker with thumbnail
            return (
              <button
                key={index}
                onClick={() => jumpToTimestamp(part.seconds)}
                className="inline-flex items-center gap-1.5 mx-1 px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors group"
                title={`Jump to ${part.time}`}
              >
                {part.thumbnail && (
                  <img
                    src={part.thumbnail}
                    alt={`Frame at ${part.time}`}
                    className="w-12 h-8 object-cover rounded border border-blue-200 dark:border-blue-800"
                  />
                )}
                <Play className="h-3 w-3" />
                <span className="text-xs font-medium">{part.time}</span>
              </button>
            );
          }
        })}
      </div>
    );
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsLoading(true);

    // Simulate API call - replace with actual API endpoint
    setTimeout(async () => {
      // Demo response with timestamps
      const demoContent = `Based on the video content, I can see that ${userInput.toLowerCase()} relates to the visual elements present. 

At <timestamp>0:15</timestamp>, there's a key moment showing the initial setup. Later, around <timestamp>1:30</timestamp>, you can see the main action sequence. The climax occurs at <timestamp>3:10:12</timestamp> where all elements come together.

This is a demo response - integrate with your actual Large Video Model API to get real-time analysis.`;

      // Extract and process timestamps
      const timestamps = await processMessageContent(demoContent);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: demoContent,
        timestamp: new Date(),
        timestamps,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#171717]">
      {/* Navigation */}
      <nav className="fixed z-50 w-full start-0 left-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#171717]/80 backdrop-blur-sm">
        <NavigationHero />
      </nav>

      <div className="pt-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Header - Minimal OpenAI style */}
          <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Video Analysis
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload a video and ask questions about its content
            </p>
          </div>

          {/* Main Content - OpenAI style layout */}
          <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)]">
            {/* Left Column - Video Player */}
            <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-800">
              {/* Video Player */}
              <div className="flex-1 bg-black flex items-center justify-center relative min-h-0">
                {videoUrl ? (
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                      Upload a video to get started
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      Choose file
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
              
              {/* Video Info Bar */}
              {videoUrl && (
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Video className="h-4 w-4" />
                    <span className="truncate max-w-md">{videoFile?.name || "Video loaded"}</span>
                  </div>
                  <button
                    onClick={() => {
                      setVideoUrl("");
                      setVideoFile(null);
                      if (videoRef.current) {
                        videoRef.current.src = "";
                      }
                    }}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Chat Input - OpenAI style */}
              <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-[#171717]">
                <div className="max-w-3xl mx-auto">
                  <div className="relative flex items-end gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask a question about the video..."
                        className="min-h-[52px] max-h-[200px] resize-none border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-400 dark:focus:border-gray-600 rounded-lg px-4 py-3 text-sm shadow-sm"
                        disabled={isLoading || !videoUrl}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim() || !videoUrl}
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Response Panel - OpenAI style */}
            <div className="w-full lg:w-[400px] flex flex-col bg-white dark:bg-[#171717] border-l border-gray-200 dark:border-gray-800">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">Responses</h2>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                      <MessageSquare className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">
                      Ask a question to see responses here
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex flex-col gap-1.5 ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2.5 max-w-[85%] ${
                          message.role === "user"
                            ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {message.role === "assistant" && message.timestamps
                          ? renderMessageContent(message.content, message.timestamps)
                          : (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          )}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex items-start">
                    <div className="rounded-lg px-4 py-2.5 bg-gray-100 dark:bg-gray-800">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

