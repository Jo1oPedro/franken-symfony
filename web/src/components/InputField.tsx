type InputFieldProps = {
    label: string;
    type: "text" | "email" | "password";
    value: string ;
    onChange: (value: string) => void;
    error?: string;
}

const InputField = (
    {label, type, value, onChange, error}: InputFieldProps) =>
{
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-400">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input"
            />
            {error && <span className="text-red-400 text-xs">{error}</span>}
        </div>
    )
};

export default InputField;