import { useEffect, useState } from "react";
import Table from "../../components/molecules/table/Table";
import Modal from "../../components/molecules/modal/modal";
import MultiSelect from "../../components/atoms/selects/Select";
import CheckboxGroup, {
  CheckboxOption,
} from "../../components/atoms/checkbox/checkbox";
import httpClient from "../../api/httpClient";
import "./AdminPage.css";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [rolesOpts, setRolesOpts] = useState<any[]>([]);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPassword, setEditPassword] = useState("");
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  function fetchUsers() {
    httpClient
      .get("users/all/Users")
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }

  function fetchRoles() {
    httpClient
      .get("users/all/roles")
      .then((res) => setRolesOpts(res.data))
      .catch(() => setRolesOpts([]));
  }

  function handleDelete(email: string) {
    setDeleteEmail(email);
  }

  async function confirmDelete() {
    if (deleteEmail) {
      await httpClient.delete(`users/${deleteEmail}`);
      setSuccessMessage("¡Usuario eliminado correctamente!");
      setDeleteEmail(null);
      setTimeout(() => setSuccessMessage(""), 4000);
      fetchUsers();
    }
  }

  // Cuando abras el modal de edición:
  function handleEdit(user: any) {
    setEditUser(user);
    setEditPassword("");
    setEditRoles(user.rolesUsuario?.map((r: any) => String(r.rol?.id)) || []);
    setEditModalOpen(true);
  }

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editUser) return;
    const body: any = {};
    if (editPassword) body.contrasena = editPassword;
    body.roles = editRoles.map(Number); // Aquí conviertes a número
    await httpClient.put(`users/${editUser.email}`, body);
    setSuccessMessage("¡Usuario actualizado correctamente!");
    setEditModalOpen(false);
    setEditUser(null);
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchUsers();
  }

  const columns = [
    { key: "email", label: "Email" },
    {
      key: "roles",
      label: "Roles",
      render: (row: any) =>
        row.rolesUsuario?.map((r: any) => r.rol?.nombre).join(", "),
    },
  ];

  return (
    <div className="admin-container">
      {successMessage && (
        <div className="register-success">{successMessage}</div>
      )}
      <div className="admin-header">
        <span className="admin-title">Usuarios</span>
      </div>
      <Table
        columns={columns}
        data={users}
        actions={(row) => (
          <>
            <button
              title="Editar usuario"
              className="delete-btn"
              style={{ color: "#23326b" }}
              onClick={() => handleEdit(row)}
            >
              ✏️
            </button>
            <button
              title="Eliminar usuario"
              className="delete-btn"
              onClick={() => handleDelete(row.email)}
            >
              🗑️
            </button>
          </>
        )}
      />
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Editar usuario"
      >
        <form
          onSubmit={handleEditSubmit}
          className="admin-form"
          style={{ maxWidth: 500, margin: "0 auto" }}
        >
          <label>
            Email:
            <input type="text" value={editUser?.email || ""} disabled />
          </label>
          <label>
            Nueva contraseña:
            <input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              placeholder="Dejar vacío para no cambiar"
            />
          </label>
          <label style={{ gridColumn: "1 / -1" }}>
            Roles:
            <CheckboxGroup
              options={rolesOpts.map(
                (r: any) =>
                  ({
                    label: r.nombre,
                    value: String(r.id),
                  } as CheckboxOption)
              )}
              value={editRoles}
              onChange={(selected) => {
                if (selected.length === 0 && rolesOpts.length > 0) {
                  setEditRoles([String(rolesOpts[0].id)]);
                } else {
                  setEditRoles(selected as string[]);
                }
              }}
              single={false}
            />
          </label>
          <button type="submit">Guardar cambios</button>
        </form>
      </Modal>
      {/* Modal de eliminación */}
      <Modal open={!!deleteEmail} onClose={() => setDeleteEmail(null)} title="">
        <div className="admin-modal-content">
          <div className="admin-modal-title">
            ¿Está seguro de que desea eliminar este usuario?
          </div>
          <div className="admin-modal-actions">
            <button onClick={confirmDelete} className="admin-modal-btn delete">
              Sí, eliminar
            </button>
            <button
              onClick={() => setDeleteEmail(null)}
              className="admin-modal-btn cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
