
interface LabeledInputProps {
    label: string;
    type?: string;
    id: string;
    placeholder?: string;
    className?: string;
  }
  
  
  const LabeledInput: React.FC<LabeledInputProps> = ({
      label,
      type = "text",
      id,
      placeholder,
      className,

    }) => (
      <div className={`flex flex-col justify-center ${className}`}>
       <label htmlFor={id} className="text-sm font-bold text-black">
            {label}
            </label>
            <input
            type={type}
            id={id}
            placeholder={placeholder}
            aria-label={placeholder}
            className=" mt-2 h-7 rounded border border-solid border-neutral-400"
            name={id}
            required
          />
      </div>
    );

    export default LabeledInput;