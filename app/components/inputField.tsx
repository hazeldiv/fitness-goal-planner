import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

export default function InputField({
  label,
  type,
  placeholder,
  value = "",
  onChange,
  className,
  line,
  error,
  required = false,
  disabled = false,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  line?: number;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <form
      noValidate
      autoComplete="off"
      className={className}
      onSubmit={(e) => e.preventDefault()}
    >
      <FormControl fullWidth>
        <FormHelperText
          sx={{ color: "#262626", fontSize: 15, display: "flex", gap: 0.3 }}
        >
          <span style={{ fontFamily: "Kanit, sans-serif" }}>{label}</span>
          {required && <span className="text-[#d93025]">*</span>}
        </FormHelperText>
        <TextField
          disabled={disabled}
          error={error != null}
          type={type}
          placeholder={placeholder}
          value={value}
          onWheel={(e) => {
            (e.target as HTMLInputElement).blur();
          }}
          onChange={onChange}
          multiline={line != null}
          rows={line}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              fontFamily: "kanit, sans-serif",
            },
          }}
        />
        {error && (
          <FormHelperText sx={{ color: "#d93025", fontSize: 12 }}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
