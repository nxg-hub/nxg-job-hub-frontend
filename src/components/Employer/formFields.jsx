import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "../ui/phone-input";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";

const InputField = ({ labelName, name, value, type, onChange, ...props }) => {
  const handleInputChange = (event) => {
    onChange(name, event.target.value);
  };
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{labelName}</Label>
      <Input
        id={name}
        name={name}
        value={value || ""}
        type={type}
        onChange={handleInputChange}
        {...props}
      />
    </div>
  );
};

const TextareaField = ({ labelName, name, value, onChange, ...props }) => {
  const handleInputChange = (event) => {
    onChange(name, event.target.value);
  };

  return (
    <div className="space-y-2">
      {labelName && <Label htmlFor={name}>{labelName}</Label>}
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        {...props}
      />
    </div>
  );
};

const SelectionField = ({
  labelName,
  name,
  value,
  onChange,
  options = [],
  placeholder,
}) => {
  const handleValueChange = (selectedValue) => {
    onChange(name, selectedValue);
  };

  return (
    <div className="space-y-2">
      {labelName && <Label>{labelName}</Label>}
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="font-normal">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const PhoneNumberField = ({ labelName, value, name, onChange, ...props }) => {
  const handleInputChange = (val) => {
    onChange?.(name, val);
  };
  return (
    <div className="space-y-2">
      {labelName && <Label htmlFor={name}>{labelName}</Label>}
      <PhoneInput value={value} onChange={handleInputChange} {...props} />
    </div>
  );
};

const VacancyField = ({
  labelName,
  name,
  value = [],
  onChange,
  placeholder,
}) => {
  const [vacancyInput, setVacancyInput] = useState("");

  const handleAddVacancy = () => {
    const trimmed = vacancyInput.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange(name, [...value, trimmed]);
      setVacancyInput("");
    }
  };

  const handleRemoveVacancy = (vacancy) => {
    const update = value.filter((item) => item !== vacancy);
    onChange(name, update);
  };

  return (
    <div className="space-y-2">
      {labelName && <Label htmlFor={name}>{labelName}</Label>}
      <div className="flex gap-5">
        <Input
          id={name}
          name={name}
          value={vacancyInput}
          onChange={(e) => setVacancyInput(e.target.value)}
          placeholder={placeholder || "Add available vacancy"}
        />
        <Button
          type="button"
          className="border-transparent bg-gray-200 text-gray-800"
          onClick={handleAddVacancy}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {/* Display available vacancies */}
      {value?.length > 0 ? (
        <div className="border-[1px] py-4 px-8 rounded space-y-2">
          <Label>Available vacancies</Label>
          <div className="flex flex-wrap gap-2">
            {value.map((vacancy, index) => (
              <Badge
                key={index}
                className="px-3 py-1 text-sm flex items-center gap-2"
              >
                {vacancy}
                <Button
                  type="button"
                  size="sm"
                  className="border-transparent h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemoveVacancy(vacancy)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-[1px] p-8 rounded text-center text-sm text-gray-400 italic">
          No Vacancy added yet
        </div>
      )}
    </div>
  );
};

const DirectorsField = ({
  labelName,
  name,
  value = [],
  onChange,
  placeholder,
}) => {
  const [directorNameInput, setDirectorNameInput] = useState("");

  const handleAddDirector = () => {
    const trimmed = directorNameInput.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange(name, [...value, trimmed]);
      setDirectorNameInput("");
    }
  };

  const handleRemoveDirector = (director) => {
    const update = value.filter((item) => item !== director);
    onChange(name, update);
  };

  return (
    <div className="space-y-2">
      {labelName && <Label htmlFor={name}>{labelName}</Label>}
      <div className="w-full flex gap-5">
        <Input
          id={name}
          name={name}
          value={directorNameInput}
          onChange={(e) => setDirectorNameInput(e.target.value)}
          placeholder={placeholder || "Add director's name"}
        />
        <Button
          type="button"
          className="border-transparent bg-gray-200 text-gray-800"
          onClick={handleAddDirector}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {value?.length > 0 ? (
        <div className="border-[1px] py-4 px-8 rounded space-y-2">
          <p className="italic text-gray-70 text-sm">Name of Director's</p>
          <div className="flex flex-wrap gap-2">
            {value.map((director, index) => (
              <div
                key={index}
                className="shadow px-3 pr-6 py-2 text-sm flex items-center gap-10 rounded-sm"
              >
                <div className="flex flex-col gap-20 px-5">
                  <div className="flex flex-col">
                    {" "}
                    <p className="text-gray-400 text-xs ml-10 mb-0">Name</p>
                    <p>{director}</p>
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  className="border-transparent h-4 w-4 p-0 bg-red-400 hover:bg-red-500"
                  onClick={() => handleRemoveDirector(director)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-[1px] p-8 rounded text-center text-sm text-gray-400 italic">
          No Director's added yet
        </div>
      )}
    </div>
  );
};

export {
  InputField,
  TextareaField,
  SelectionField,
  PhoneNumberField,
  VacancyField,
  DirectorsField,
};
