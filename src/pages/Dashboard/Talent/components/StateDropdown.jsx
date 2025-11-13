import React from "react";

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export default function StateDropdown({ selectedState, onSelect }) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label htmlFor="state" className="text-sm font-medium text-[#0AACDC]">
        Select State
      </label>

      <select
        id="state"
        value={selectedState || ""}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200">
        <option value="">All States</option>
        {nigerianStates.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
}
