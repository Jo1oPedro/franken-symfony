type ButtonVariant = "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "ghost" | "neutral";

type ButtonProps = {
    label: string;
    variant?: ButtonVariant;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string
};

const Button = (
    {label, variant, type = "button", disabled = false, className = ""}: ButtonProps
) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={
                `btn ${variant ? ` btn-${variant}` : ""} ${className}`.trim()}
        >
            {label}
        </button>
    )
}

export default Button
