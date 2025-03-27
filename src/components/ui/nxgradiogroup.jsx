export default function NXGRadioButtonGroup({
  radios,
  name,
  selectedRadio,
  onChange,
  className,
}) {
  return (
    <div className={`flex flex-col w-[70%] ${className}`}>
      {radios.map((radio) => (
        <label
          key={radio.value}
          className="w-full flex justify-between px-5 py-3 rounded-md 
            border border-gray-400 cursor-pointer">
          <span>{radio.label}</span>
          <input
            type="radio"
            name={name}
            value={radio.value}
            checked={selectedRadio === radio.value}
            onChange={() => onChange(radio.value)}
            className="w-min h-6 flex self-center mt-1"
          />
        </label>
      ))}
    </div>
  );
}
