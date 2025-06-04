import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./checkbox.css";

export interface CheckboxOption {
  label: string;
  value: string | number;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  single?: boolean;
}

export default function CheckboxGroup({
  options,
  value,
  onChange,
  single = false,
}: CheckboxGroupProps) {
  function handleChange(optionValue: string | number) {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (single) {
        onChange([optionValue]);
      } else {
        onChange([...value, optionValue]);
      }
    }
  }

  return (
    <>
      <div className="checkbox-group">
        {options.map((opt) => (
          <label className="checkbox-label" key={opt.value}>
            <RadixCheckbox.Root
              className="checkbox-root"
              checked={value.includes(opt.value)}
              onCheckedChange={() => handleChange(opt.value)}
            >
              <RadixCheckbox.Indicator className="checkbox-indicator">
                <CheckIcon />
              </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            <span className="checkbox-text">{opt.label}</span>
          </label>
        ))}
      </div>
    </>
  );
}
