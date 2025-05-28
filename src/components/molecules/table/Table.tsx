import React from "react";
import { TableProps } from "./table.interface";
import "./table.css";

export default function Table<T>({ columns, data, actions }: TableProps<T>) {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
          {actions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(row) : (row as any)[col.key]}
              </td>
            ))}
            {actions && <td>{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
