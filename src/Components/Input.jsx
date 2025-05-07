function Input({ label, placeholder, type = "text", id, ...props }) {
  const inputId = id || placeholder?.split(" ")[0]?.toLowerCase();

  return (
    <div className="flex flex-col space-y-[3px] text-[#FEFCFC]">
      <label htmlFor={inputId} className="w-[138px] h-[21px] text-[14px] font-thin">
        {label}
      </label>
      <input
        className="bg-[#6268C6] w-[350px] h-[40px] rounded-[6px] text-[12px] ps-[18px] py-[11px] text-[#C4C4C4] focus:outline-none"
        id={inputId}
        type={type}
        inputMode={type === "number" ? "tel" : undefined}
        placeholder={placeholder}
        aria-label={label}
        aria-describedby={`${inputId}-desc`}
        {...props}
      />
    </div>
  );
}

export default Input;
