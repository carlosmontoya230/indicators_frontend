import { useNavigate, useLocation } from "react-router-dom";
import { SidebarProps } from "./sidebar.interface";
import "./sidebar.css";
import { useEffect, useState } from "react";

export default function SidebarUnix({
  items,
  userRoles,
  onToggle,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  // Obtén el email del usuario
  const emailFull = localStorage.getItem("email") || "Usuario";
  const email = emailFull.split("@")[0];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    navigate("/login");
  }

  useEffect(() => {
    if (onToggle) onToggle(open);
  }, [open, onToggle]);

  return (
    <>
      <button
        className={`sidebar-toggle-btn${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Ocultar menú" : "Mostrar menú"}
      >
        {open ? "«" : "»"}
      </button>
      <aside className={`sidebar-unix${open ? " open" : " closed"}`}>
        <div className="sidebar-title">Menú</div>
        <nav>
          <ul>
            {items.map((item) => {
              const enabled = item.allowedRoles.some((role) =>
                userRoles.includes(role)
              );
              const active = location.pathname === item.path;
              return (
                <li
                  key={item.path}
                  className={`sidebar-item${active ? " active" : ""}${
                    !enabled ? " disabled" : ""
                  }`}
                  onClick={() => enabled && navigate(item.path)}
                  tabIndex={enabled ? 0 : -1}
                  aria-disabled={!enabled}
                >
                  {item.icon && (
                    <span className="sidebar-icon">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="sidebar-bottom">
          <hr className="sidebar-separator" />
          <div className="sidebar-user">
            <span className="sidebar-user-email">{email}</span>
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
