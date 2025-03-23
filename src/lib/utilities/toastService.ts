import { toast } from "react-toastify";



const playSound = () => {
    const audio = new Audio("/audio/notification.mp3"); // Create a new instance each time
    audio.currentTime = 0; // Reset audio to start
    audio.play().catch((err) => console.error("Audio play failed:", err));
};

export const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    playSound();
    
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "warning":
            toast.warning(message);
            break;
        default:
            toast.info(message);
    }
};
