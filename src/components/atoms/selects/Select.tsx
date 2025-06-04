import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import "./Select.css";
import { SelectOption } from "./select.interface";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Props {
  options: SelectOption[];
  value: string | number | null;
  onChange: (selected: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Selecciona...",
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const selectedOptionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = 220;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      let top = rect.bottom + window.scrollY + 2;
      let left = rect.left + window.scrollX;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        top = rect.top + window.scrollY - dropdownHeight - 2;
      }

      setDropdownStyle({
        top,
        left,
        width: rect.width,
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  function handleSelect(val: string | number) {
    onChange(val);
    setOpen(false);
  }

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setOpen(false);
    }
  }

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div
      className={`unix-select-container${disabled ? " disabled" : ""}`}
      tabIndex={0}
      ref={containerRef}
      onBlur={handleBlur}
    >
      <div
        className={`unix-select-selected${open ? " open" : ""}`}
        onClick={() => !disabled && setOpen((v) => !v)}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        tabIndex={0}
      >
        <span
          className={`unix-select-value${
            !selectedOption ? " placeholder" : ""
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ArrowDropDownIcon className="unix-select-arrow" />
      </div>
      {open && !disabled && (
        <div className="unix-select-dropdown" style={dropdownStyle}>
          {options.map((opt) => (
            <div
              key={opt.value}
              ref={value === opt.value ? selectedOptionRef : undefined}
              className={`unix-select-option${
                value === opt.value ? " selected" : ""
              }`}
              onMouseDown={() => handleSelect(opt.value)}
              tabIndex={-1}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
