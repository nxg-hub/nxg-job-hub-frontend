import { useState } from "react";

const institutions = [
  "University of Ibadan",
  "University of Lagos",
  "Ahmadu Bello University",
  "Obafemi Awolowo University",
  "Covenant University",
  "University of Nigeria, Nsukka",
  "Lagos State University",
  "Bayero University, Kano",
  "Federal University of Technology, Akure",
  "Federal University of Technology, Minna",
  "Federal University, Dutse",
  "Abubakar Tafawa Balewa University",
  "Michael Okpara University of Agriculture, Umudike",
  "Nigerian Defence Academy",
  "National Open University of Nigeria",
  "University of Port Harcourt",
  "University of Calabar",
  "University of Benin",
  "University of Ilorin",
  "University of Jos",
  "University of Uyo",
  "University of Abuja",
  "Federal University of Technology, Owerri",
  "Federal University of Agriculture, Abeokuta",
  "Federal University, Gashua",
  "Federal University Dutsin-Ma",
  "Federal University of Petroleum Resources, Effurun",
  "Pan-Atlantic University, Lagos",
  "American University of Nigeria, Yola",
  "Babcock University",
  "Madonna University",
  "Igbinedion University",
  "Bowen University",
  "Bells University of Technology",
  "Al-Hikmah University",
  "Redeemer’s University",
  "Joseph Ayo Babalola University",
  "Ajayi Crowther University",
  "Crescent University",
  "Lead City University",
  "Olabisi Onabanjo University",
  "Kwara State University",
  "Ekiti State University",
  "Ambrose Alli University",
  "Rivers State University",
  "Abia State University",
  "Gombe State University of Science & Technology",
  "Umaru Musa Yar’adua University",
  "Westland University",
  "Augustine University, Ilara",
  // … you can add more
];

const InstitutionAutocomplete = ({ value, onChange }) => {
  const [query, setQuery] = useState(value || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter institutions by query
  const suggestions = institutions.filter((inst) =>
    inst.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (inst) => {
    setQuery(inst);
    onChange(inst);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        placeholder="Enter school/institution name"
        className="w-full border rounded px-2 py-1"
        onFocus={() => setShowSuggestions(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
      />

      {showSuggestions && query && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 max-h-40 overflow-auto rounded shadow-sm">
          {suggestions.map((inst, idx) => (
            <li
              key={idx}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(inst)}>
              {inst}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstitutionAutocomplete;
