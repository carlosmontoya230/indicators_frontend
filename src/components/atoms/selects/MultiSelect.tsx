import React, { useState } from "react";
import "./multiSelect.css";
import CloseIcon from "@mui/icons-material/Close";
import { MultiSelectUnixProps } from "./miltiSelect.interface";

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Selecciona...",
}: MultiSelectUnixProps) {
  const [open, setOpen] = useState(false);

  function selectOption(val: string | number) {
    if (value.includes(val)) {
      onChange([]);
    } else {
      onChange([val]);
    }
    setOpen(false);
  }

  function handleRemove(val: string | number) {
    onChange([]);
  }

  return (
    <div
      className="multi-select-unix"
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <div className="multi-select-selected" onClick={() => setOpen((v) => !v)}>
        {value.length === 0 && (
          <span className="multi-select-placeholder">{placeholder}</span>
        )}
        {value.map((val) => {
          const opt = options.find((o) => o.value === val);
          return (
            <span className="multi-select-chip" key={val}>
              {opt?.label ?? val}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(val);
                }}
                className="multi-select-chip-close"
                aria-label="Eliminar"
              >
                <CloseIcon fontSize="small" />
              </button>
            </span>
          );
        })}
        <span className="multi-select-arrow">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="multi-select-dropdown">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`multi-select-option${
                value.includes(opt.value) ? " selected" : ""
              }`}
              onMouseDown={() => selectOption(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
