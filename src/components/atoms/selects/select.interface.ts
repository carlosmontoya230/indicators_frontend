export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps {
  options: SelectOption[];
  value: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  placeholder?: string;
}
