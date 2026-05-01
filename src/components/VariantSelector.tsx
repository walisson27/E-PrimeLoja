type Props = {
  label: string;
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
};

const VariantSelector = ({ label, options, selected, onChange }: Props) => {
  return (
    <div>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">{label}</h2>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-2xl border px-4 py-2.5 text-sm font-bold transition ${
              selected === option
                ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;
