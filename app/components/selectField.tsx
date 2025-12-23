import {
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function SelectField({
  label,
  placeholder,
  value,
  onChange,
  className,
  options,
  error,
  disabled = false,
  required = false,
  borderRadius = 0,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  className?: string;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  required?: boolean;
  error?: string | null;
  borderRadius?: number;
}) {
  return (
    <form noValidate autoComplete="off" className={className}>
      <FormControl fullWidth>
        <FormHelperText
          sx={{ color: "#026345", fontSize: 15, display: "flex", gap: 0.3 }}
        >
          <span style={{ fontFamily: "Kanit, sans-serif" }}>{label}</span>
          {required && <span className="text-[#d93025]">*</span>}
        </FormHelperText>
        <Select
          value={value}
          displayEmpty
          error={error != null}
          onChange={onChange}
          input={<OutlinedInput />}
          disabled={disabled == true}
          // sx={{ borderRadius: borderRadius }}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span
                  style={{ color: "#aaa", fontFamily: "Kanit, sans-serif" }}
                >
                  {placeholder}
                </span>
              );
            }
            const selectedOption = options?.find((o) => o.value === selected);
            return selectedOption?.label ?? "";
          }}
        >
          {options?.map((option, index) => (
            <MenuItem value={option.value} key={index}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <FormHelperText sx={{ color: "#d93025", fontSize: 12 }}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
