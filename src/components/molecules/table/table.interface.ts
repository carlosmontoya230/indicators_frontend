export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: (row: T) => React.ReactNode;
}
