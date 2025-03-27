"use client";

import { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "../button";

interface ComboboxProps {
  options: string[]; // Changed to string[]
  onChange: (selected: string) => void; // Changed to just pass the string value
  initialValue?: string;
  placeholder?: string;
}

export default function CustomCombobox({
  options,
  onChange,
  initialValue,
  placeholder = "Select an option",
}: ComboboxProps) {
  const initialOption = options.includes(initialValue || "") ? initialValue || "" : ""; // Ensure a string value
  const [selectedOption, setSelectedOption] = useState<string>(initialOption);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Combobox Button */}
      <Button
        variant={"outline"}
        className="w-full flex justify-between items-center border border-gray-300 rounded-lg px-4 py-2 shadow-sm  text-sm focus:ring-2 focus:ring-blue-500"
        onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
      >
        <div className="flex items-center gap-2">
          {selectedOption ? selectedOption : placeholder}
        </div>
        <ChevronsUpDown className="w-4 h-4 opacity-50" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white dark:bg-card dark:text-card-foreground border border-gray-300 rounded-lg shadow-lg z-10">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-200 bg-inherit focus:outline-none"
          />

          {/* Options List */}
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSelect(option)}
                >
                  <div className="flex items-center gap-2">
                    {option}
                  </div>
                  {selectedOption === option && <Check className="w-4 h-4 text-blue-500" />}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
