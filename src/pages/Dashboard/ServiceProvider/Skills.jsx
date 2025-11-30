import React from "react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Skills = ({
  availableSkills,
  setNewSkill,
  newSkill,
  handleAddCustomSkill,
  toggleSkill,
  selectedSkills,
  handleKeyDown,
}) => {
  return (
    <CardContent>
      {/* Predefined Skills */}
      {availableSkills.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {availableSkills.map((skill, i) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  isSelected
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}>
                {skill}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-3">
          No predefined skills for this job title. Add custom skills below.
        </p>
      )}

      {/* Custom Skill Input */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Add a custom skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button
          onClick={handleAddCustomSkill}
          className="bg-sky-500 hover:bg-sky-600 text-white">
          Add
        </Button>
      </div>

      {/* Selected Skills Display */}
      <div className="flex flex-wrap gap-2">
        {selectedSkills.length > 0 ? (
          selectedSkills.map((skill, i) => (
            <div
              key={i}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {skill}
              <button
                onClick={() => toggleSkill(skill)}
                className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No skills selected yet.</p>
        )}
      </div>
    </CardContent>
  );
};

export default Skills;
