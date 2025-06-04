import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../components/molecules/table/Table";
import Modal from "../../components/molecules/modal/modal";
import Select from "../../components/atoms/selects/Select";
import httpClient from "../../api/httpClient";

export default function ResultsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [resultado, setResultado] = useState<number | "">("");
  const [fechacalculo, setFechacalculo] = useState<string>(
    new Date().toISOString().slice(0, 19) + ".000Z"
  );
  const [fkidindicador, setFkidindicador] = useState<string | number | null>(
    null
  );
  const [indicadorOpts, setIndicadorOpts] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchData();
    httpClient
      .get("indicators/all-indicators")
      .then((res) => setIndicadorOpts(res.data));
  }, []);

  function fetchData() {
    httpClient
      .get("indicators/get-results")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }

  const tableData = data.map((item: any) => ({
    id: item.id,
    resultado: item.resultado,
    fechacalculo: item.fechacalculo?.slice(0, 19).replace("T", " "),
    fkidindicador: item.fkidindicador,
    indicadorCodigo: item.indicador?.codigo,
    indicadorNombre: item.indicador?.nombre,
  }));

  const columns = [
    { key: "resultado", label: "Resultado" },
    { key: "fechacalculo", label: "Fecha de Cálculo" },
    { key: "indicadorCodigo", label: "Código Indicador" },
    { key: "indicadorNombre", label: "Nombre Indicador" },
  ];

  async function handleDelete(row: any) {
    await httpClient.delete(`indicators/remove-results/${row.id}`);
    setSuccessMessage("¡Resultado eliminado correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchData();
  }

  function handleAdd() {
    setResultado("");
    setFechacalculo(new Date().toISOString().slice(0, 19) + ".000Z");
    setFkidindicador(null);
    setModalOpen(true);
  }

  async function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (resultado === "" || !fechacalculo || !fkidindicador) return;
    await httpClient.post("indicators/create-results", {
      resultado: Number(resultado),
      fechacalculo,
      fkidindicador,
    });
    setSuccessMessage("¡Resultado creado correctamente!");
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
        <span className="indicators-title">Resultados por Indicador</span>
        <button
          className="add-indicator-btn"
          onClick={handleAdd}
          title="Agregar resultado"
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
        title="Agregar Resultado a Indicador"
      >
        <form onSubmit={handleModalSubmit} className="indicator-form">
          <label>
            Resultado:
            <input
              type="number"
              value={resultado}
              onChange={(e) =>
                setResultado(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              required
            />
          </label>
          <label>
            Fecha de cálculo:
            <input
              type="datetime-local"
              value={fechacalculo.slice(0, 16)}
              onChange={(e) => {
                // Convertir a formato ISO 8601 con .000Z
                const val = e.target.value;
                setFechacalculo(val ? val + ":00.000Z" : "");
              }}
              required
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
