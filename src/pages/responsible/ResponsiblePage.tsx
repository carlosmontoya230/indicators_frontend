import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../components/molecules/table/Table";
import Modal from "../../components/molecules/modal/modal";
import Select from "../../components/atoms/selects/Select";
import "./Responsible.css";
import httpClient from "../../api/httpClient";

export default function ResponsiblePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [fkidresponsable, setFkidresponsable] = useState<
    string | number | null
  >(null);
  const [fkidindicador, setFkidindicador] = useState<string | number | null>(
    null
  );
  const [responsableOpts, setResponsableOpts] = useState<any[]>([]);
  const [indicadorOpts, setIndicadorOpts] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Fecha actual en formato ISO
  const fechaAsignacion = new Date().toISOString();

  useEffect(() => {
    fetchData();
    httpClient
      .get("/actor/all-actors")
      .then((res) => setResponsableOpts(res.data));
    httpClient
      .get("/indicators/all-indicators")
      .then((res) => setIndicadorOpts(res.data));
  }, []);

  function fetchData() {
    httpClient
      .get("/actor/getAll/responsible-per-indicator")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }

  const tableData = data.flatMap((item: any) =>
    (item.responsables || []).map((resp: any) => ({
      indicadorId: item.indicador.id,
      indicadorCodigo: item.indicador.codigo,
      indicadorNombre: item.indicador.nombre,
      responsableId: resp.responsable?.id,
      responsableNombre: resp.responsable?.nombre,
      fechaAsignacion: resp.fechaasignacion?.slice(0, 19).replace("T", " "),
    }))
  );

  const columns = [
    { key: "indicadorCodigo", label: "Código Indicador" },
    { key: "indicadorNombre", label: "Nombre Indicador" },
    { key: "responsableId", label: "ID Responsable" },
    { key: "responsableNombre", label: "Nombre Responsable" },
    { key: "fechaAsignacion", label: "Fecha Asignación" },
  ];

  async function handleDelete(row: any) {
    await httpClient.delete(`/actor/${row.indicadorId}/${row.responsableId}`);
    setSuccessMessage("¡Responsable eliminado correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchData();
  }

  function handleAdd() {
    setFkidresponsable(null);
    setFkidindicador(null);
    setModalOpen(true);
  }

  async function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fkidresponsable || !fkidindicador) return;
    const fecha = new Date().toISOString();
    await httpClient.post("/actor/assign-responsible", {
      fkidresponsable,
      fkidindicador,
      fechaasignacion: fecha,
    });
    setSuccessMessage("¡Responsable asignado correctamente!");
    setModalOpen(false);
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchData();
  }

  return (
    <div className="indicators-container">
      {successMessage && (
        <div className="register-success">{successMessage}</div>
      )}
      <div className="indicators-header">
        <span className="indicators-title">Responsables por Indicador</span>
        <button
          className="add-indicator-btn"
          onClick={handleAdd}
          title="Agregar responsable"
        >
          <AddIcon />
        </button>
      </div>
      <Table
        columns={columns}
        data={tableData}
        actions={(row) => (
          <>
            <button
              title="Eliminar"
              onClick={() => handleDelete(row)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#c00",
                fontSize: "1.2rem",
                padding: 0,
              }}
            >
              🗑️
            </button>
          </>
        )}
      />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Asignar Responsable a Indicador"
      >
        <form onSubmit={handleModalSubmit} className="indicator-form">
          <label>
            Responsable:
            <Select
              options={responsableOpts.map((o: any) => ({
                label: `${o.nombre} (${o.id})`,
                value: o.id,
              }))}
              value={fkidresponsable}
              onChange={setFkidresponsable}
              placeholder="Selecciona responsable"
            />
          </label>
          <label>
            Indicador:
            <Select
              options={indicadorOpts.map((o: any) => ({
                label: `${o.codigo} - ${o.nombre}`,
                value: o.id,
              }))}
              value={fkidindicador}
              onChange={setFkidindicador}
              placeholder="Selecciona indicador"
            />
          </label>
          <label>
            Fecha asignación:
            <input type="text" value={new Date().toISOString()} disabled />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </Modal>
    </div>
  );
}
