export interface SidebarItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  allowedRoles: (string | number)[];
}

export interface SidebarProps {
  items: SidebarItem[];
  userRoles: (string | number)[];
  onToggle?: (open: boolean) => void;
}
