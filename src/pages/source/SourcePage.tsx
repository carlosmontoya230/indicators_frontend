import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../components/molecules/table/Table";
import Modal from "../../components/molecules/modal/modal";
import Select from "../../components/atoms/selects/Select";

import httpClient from "../../api/httpClient";

export default function SourcePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [fkidfuente, setFkidfuente] = useState<string | number | null>(null);
  const [fkidindicador, setFkidindicador] = useState<string | number | null>(
    null
  );
  const [fuenteOpts, setFuenteOpts] = useState<any[]>([]);
  const [indicadorOpts, setIndicadorOpts] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchData();
    httpClient.get("source/all-sources").then((res) => setFuenteOpts(res.data));
    httpClient
      .get("indicators/all-indicators")
      .then((res) => setIndicadorOpts(res.data));
  }, []);

  function fetchData() {
    httpClient
      .get("source/all-sources-per-indicator")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }

  const tableData = data.map((item: any) => ({
    fkidfuente: item.fkidfuente,
    fuenteNombre: item.fuente?.nombre,
    fkidindicador: item.fkidindicador,
    indicadorCodigo: item.indicador?.codigo,
    indicadorNombre: item.indicador?.nombre,
  }));

  const columns = [
    { key: "fuenteNombre", label: "Fuente" },
    { key: "indicadorCodigo", label: "Código Indicador" },
    { key: "indicadorNombre", label: "Nombre Indicador" },
  ];

  async function handleDelete(row: any) {
    await httpClient.delete(
      `source/delete-source-per-indicator/${row.fkidfuente}/${row.fkidindicador}`
    );
    setSuccessMessage("¡Fuente eliminada correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchData();
  }

  function handleAdd() {
    setFkidfuente(null);
    setFkidindicador(null);
    setModalOpen(true);
  }

  async function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fkidfuente || !fkidindicador) return;
    await httpClient.post("source/create-source-per-indicator", {
      fkidfuente,
      fkidindicador,
    });
    setSuccessMessage("¡Fuente asignada correctamente!");
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
        <span className="indicators-title">Fuentes por Indicador</span>
        <button
          className="add-indicator-btn"
          onClick={handleAdd}
          title="Agregar fuente"
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
        title="Asignar Fuente a Indicador"
      >
        <form onSubmit={handleModalSubmit} className="indicator-form">
          <label>
            Fuente:
            <Select
              options={fuenteOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id,
              }))}
              value={fkidfuente}
              onChange={setFkidfuente}
              placeholder="Selecciona fuente"
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
          <button type="submit">Guardar</button>
        </form>
      </Modal>
    </div>
  );
}
