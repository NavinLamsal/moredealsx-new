"use client";
import { useState, useEffect } from "react";

interface AutoTypingTextProps {
  messages: string[]; 
  typingSpeed?: number; // Speed for typing each character (in ms)
  pauseTime?: number; // Pause time after typing a message (in ms)
  className?: string; // Additional CSS classes for styling
}

const AutoTypingText: React.FC<AutoTypingTextProps> = ({
  messages,
  typingSpeed = 100,
  pauseTime = 1500,
  className = "",
}) => {
  const [currentMessage, setCurrentMessage] = useState<string>(""); // Current text being displayed
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Index of the current message
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // Typing or deleting

  useEffect(() => {
    const handleTyping = () => {
      const currentText = messages[currentIndex];

      if (!isDeleting) {
        // Typing logic: Add characters one by one
        setCurrentMessage((prev) => currentText.substring(0, prev.length + 1));
        if (currentMessage === currentText) {
          setTimeout(() => setIsDeleting(true), pauseTime); // Pause before deleting
        }
      } else {
        // Deleting logic: Remove characters one by one
        setCurrentMessage((prev) => currentText.substring(0, prev.length - 1));
        if (currentMessage === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % messages.length); // Move to next message
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout); // Cleanup timeout on unmount
  }, [currentMessage, isDeleting, currentIndex, messages, typingSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentMessage}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default AutoTypingText;
