// "use client"

// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Switch } from "@/components/ui/switch"


// export function ModeToggle() {
//   const { theme, setTheme } = useTheme()

//   // Determine if the current theme is dark
//   const isDarkMode = theme === "dark"

//   // Handle switch toggle
//   const handleToggle = (checked: boolean) => {
//     setTheme(checked ? "dark" : "light")
//   }

//   return (
//   //   <div className="flex items-center space-x-4">
//   //     <label htmlFor="theme-switch" className="flex items-center space-x-2">
//   //         <Sun className="h-[1.2rem] w-[1.2rem]" />
//   //     </label>
//   //     <Switch
//   //       id="theme-switch"
//   //       checked={isDarkMode}
//   //       onCheckedChange={handleToggle}
//   //     />
//   //     <label htmlFor="theme-switch" className="flex items-center space-x-2">
       
//   //      <Moon className="h-[1.2rem] w-[1.2rem]" />
     
//   //  </label>
//   //   </div>

//     <Switch
//       checked={isDarkMode}
//       onCheckedChange={handleToggle}
//       className="relative flex h-6 w-12 items-center rounded-full bg-gray-300 dark:bg-gray-700 transition"
//     >
//       <span
//         className={`absolute left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform ${
//           isDarkMode ? "translate-x-6" : "translate-x-0"
//         }`}
//       >
//         {isDarkMode ? <Moon className="h-4 w-4 text-white" /> : <Sun className="h-4 w-4 text-white" />}
//       </span>
//     </Switch>
//   )
  
// }

"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <button
      onClick={() => handleToggle(!isDarkMode)}
      className={`relative flex h-8 w-16 items-center rounded-full p-1 transition-all
        ${isDarkMode ? "bg-blue-600" : "bg-gray-300"}
      `}
    >
      {/* Sun Icon (Left Side) */}
      <Sun
        className={`absolute right-2 h-4 w-4 transition-opacity text-black ${
          isDarkMode ? "opacity-0" : "opacity-100" 
        }`}
       
      />

      {/* Moon Icon (Right Side) */}
      <Moon
        className={`absolute left-2 h-4 w-4 transition-opacity text-white ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Moving Switch Knob */}
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      ></span>
    </button>
  )
}

