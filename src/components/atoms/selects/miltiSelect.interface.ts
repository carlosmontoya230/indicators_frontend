export interface MultiSelectOption {
  label: string;
  value: string | number;
}

export interface MultiSelectUnixProps {
  options: MultiSelectOption[];
  value: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  placeholder?: string;
}
