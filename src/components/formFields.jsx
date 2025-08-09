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
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import {
  Award,
  CheckIcon,
  ChevronDownIcon,
  Plus,
  X,
  XCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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

const MultiSelectField = ({
  labelName,
  name,
  options,
  selected,
  onValueChange,
  placeholder = "Select items...",
  className,
}) => {
  const handleSelect = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onValueChange(name, newSelected);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onValueChange([]);
  };

  return (
    <div className="space-y-2">
      {labelName && <Label>{labelName}</Label>}
      <DropdownMenu>
        <DropdownMenuTrigger className="py-5" asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-between overflow-y-auto", className)}
            aria-haspopup="listbox"
            aria-expanded={selected.length > 0}
          >
            <div className="flex flex-wrap gap-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selected.map((value) => {
                  const option = options.find((o) => o.value === value);
                  return (
                    <Badge key={value} className="flex items-center gap-1">
                      {option?.label || value}
                      <XCircleIcon
                        className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          onValueChange(
                            name,
                            selected.filter((item) => item !== value)
                          );
                        }}
                        aria-label={`Remove ${option?.label || value}`}
                      />
                    </Badge>
                  );
                })
              )}
            </div>
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing on item click
              className="cursor-pointer"
            >
              <div
                className="flex items-center space-x-2 w-full"
                onClick={() => handleSelect(option.value)}
              >
                <Checkbox
                  className="p-0  border-black hover:border-transparent hover:bg-secondary"
                  id={`checkbox-${option.value}`}
                  checked={selected.includes(option.value)}
                  aria-checked={selected.includes(option.value)}
                />
                <label
                  htmlFor={`checkbox-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-grow"
                >
                  {option.label}
                </label>
                {selected.includes(option.value) && (
                  <CheckIcon className="ml-auto h-4 w-4 text-primary" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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

const PortFolioField = ({ labelName, name, records = [], onChange }) => {
  const [pastClientInput, setpastClientInput] = useState("");
  const [jobRoleInput, setJobRoleInput] = useState("");
  const [successStoryInput, setSuccessStoryInput] = useState("");

  const handleAddRecord = () => {
    if (
      !pastClientInput === "" &&
      !jobRoleInput === "" &&
      !successStoryInput === ""
    ) {
      let id = `Key achivement ${records.length + 1}`;
      const record = {
        portfolioId: id,
        pastClient: pastClientInput,
        jobRole: jobRoleInput,
        successStory: successStoryInput,
      };
      onChange(name, [...records, record]);
      setpastClientInput("");
      setJobRoleInput("");
      setSuccessStoryInput("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="">{labelName}</Label>
      <Card>
        <CardContent className="py-5 space-y-5">
          <div className="space-y-3">
            <Label htmlFor="pastClient">Past Client/Company:</Label>
            <Input
              id="pastClient"
              name=""
              value={pastClientInput}
              onChange={(e) => setpastClientInput(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="jobeRole">Job Role:</Label>
            <Input
              id="jobRole"
              name=""
              value={jobRoleInput}
              onChange={(e) => setJobRoleInput(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="story">Success Story:</Label>
            <Textarea
              id="story"
              name=""
              value={successStoryInput}
              onChange={(e) => setSuccessStoryInput(e.target.value)}
            />
          </div>

          <Button
            type="button"
            className="w-full border-gray-200 bg-gray-100 text-primary hover:bg-slate-100 hover:text-secondary"
            onClick={handleAddRecord}
          >
            Add <Plus className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      {records?.length > 0 ? (
        <Accordion collapsible className="w-full">
          {records.map((record) => (
            <AccordionItem key={record.portfolioId} value={record.portfolioId}>
              <AccordionTrigger className="border-transparent hover:bg-gray-50 hover:text-black">
                <div className="flex items-center gap-1 text-lg font-medium text-secondary no-underline">
                  <Award className="w-5 h-5" />
                  {record.portfolioId}
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance px-3">
                <div className="border-b-[1px] border-b-slate-200 pb-3">
                  <h1 className="text-lg font-medium">{record.pastClient}</h1>
                  <p>{record.jobRole}</p>
                </div>
                <p>{record.successStory}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="border-[1px] p-8 rounded text-center text-sm text-gray-400 italic">
          No record added yet
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
  MultiSelectField,
  PortFolioField,
};
