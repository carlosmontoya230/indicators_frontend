import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../components/molecules/table/Table";
import Modal from "../../components/molecules/modal/modal";
import Select from "../../components/atoms/selects/Select";
import httpClient from "../../api/httpClient";

export default function VisualRepresentationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [fkidindicador, setFkidindicador] = useState<string | number | null>(
    null
  );
  const [fkidrepresenvisual, setFkidrepresenvisual] = useState<
    string | number | null
  >(null);
  const [indicadorOpts, setIndicadorOpts] = useState<any[]>([]);
  const [visualOpts, setVisualOpts] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchData();
    httpClient
      .get("/indicators/all-indicators")
      .then((res) => setIndicadorOpts(res.data));
    httpClient
      .get("/represent-visual/all-represent-visuals")
      .then((res) => setVisualOpts(res.data));
  }, []);

  function fetchData() {
    httpClient
      .get("/represent-visual/all-per-indicator")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }

  const tableData = data.map((item: any) => ({
    fkidindicador: item.fkidindicador,
    indicadorCodigo: item.indicador?.codigo,
    indicadorNombre: item.indicador?.nombre,
    fkidrepresenvisual: item.fkidrepresenvisual,
    visualNombre: item.represenVisual?.nombre,
  }));

  const columns = [
    { key: "indicadorCodigo", label: "Código Indicador" },
    { key: "indicadorNombre", label: "Nombre Indicador" },
    { key: "visualNombre", label: "Representación Visual" },
  ];

  async function handleDelete(row: any) {
    await httpClient.delete(
      `/represent-visual/delete-per-indicator/${row.fkidindicador}/${row.fkidrepresenvisual}`
    );
    setSuccessMessage("¡Representación eliminada correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchData();
  }

  function handleAdd() {
    setFkidindicador(null);
    setFkidrepresenvisual(null);
    setModalOpen(true);
  }

  async function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fkidindicador || !fkidrepresenvisual) return;
    await httpClient.post("/represent-visual/create/per-indicator", {
      fkidindicador,
      fkidrepresenvisual,
    });
    setSuccessMessage("¡Representación visual asignada correctamente!");
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
        <span className="indicators-title">
          Representaciones Visuales por Indicador
        </span>
        <button
          className="add-indicator-btn"
          onClick={handleAdd}
          title="Agregar representación visual"
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
        title="Asignar Representación Visual a Indicador"
      >
        <form onSubmit={handleModalSubmit} className="indicator-form">
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
            Representación visual:
            <Select
              options={visualOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id,
              }))}
              value={fkidrepresenvisual}
              onChange={setFkidrepresenvisual}
              placeholder="Selecciona representación"
            />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </Modal>
    </div>
  );
}
