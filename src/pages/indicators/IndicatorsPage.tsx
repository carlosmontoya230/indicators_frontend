import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../components/molecules/table/Table";
import Modal from "../../components/molecules/modal/modal";

import "./indicators.css";
import httpClient from "../../api/httpClient";
import MultiSelect from "../../components/atoms/selects/MultiSelect";

export default function IndicatorsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  // Form fields
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [alcance, setAlcance] = useState("");
  const [formula, setFormula] = useState("");
  const [meta, setMeta] = useState("");
  // Foreign keys
  const [fkidtipoindicador, setFkidtipoindicador] = useState<string[]>([]);
  const [fkidunidadmedicion, setFkidunidadmedicion] = useState<string[]>([]);
  const [fkidsentido, setFkidsentido] = useState<string[]>([]);
  const [fkidfrecuencia, setFkidfrecuencia] = useState<string[]>([]);
  const [fkidarticulo, setFkidarticulo] = useState<string[]>(["0"]);
  // Options
  const [tipoIndicadorOpts, setTipoIndicadorOpts] = useState<any[]>([]);
  const [unidadMedicionOpts, setUnidadMedicionOpts] = useState<any[]>([]);
  const [sentidoOpts, setSentidoOpts] = useState<any[]>([]);
  const [frecuenciaOpts, setFrecuenciaOpts] = useState<any[]>([]);
  const [articuloOpts, setArticuloOpts] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    httpClient
      .get("/indicators/all-indicators")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }, []);

  // Traer opciones para selects
  useEffect(() => {
    httpClient
      .get("indicators/all-type-indicators")
      .then((res) => setTipoIndicadorOpts(res.data));
    httpClient
      .get("indicators/all-measurement-units")
      .then((res) => setUnidadMedicionOpts(res.data));
    httpClient
      .get("indicators/all-meanings")
      .then((res) => setSentidoOpts(res.data));
    httpClient
      .get("indicators/all-frequencies")
      .then((res) => setFrecuenciaOpts(res.data));
    httpClient
      .get("legal/all/articles")
      .then((res) => setArticuloOpts(res.data));
  }, []);

  const columns = [
    { key: "codigo", label: "Código" },
    { key: "nombre", label: "Nombre" },
    { key: "objetivo", label: "Objetivo" },
    { key: "meta", label: "Meta" },
    {
      key: "tipoIndicador",
      label: "Tipo",
      render: (row: any) => row.tipoIndicador?.nombre ?? "",
    },
    {
      key: "unidadMedicion",
      label: "Unidad",
      render: (row: any) => row.unidadMedicion?.descripcion ?? "",
    },
    {
      key: "sentido",
      label: "Sentido",
      render: (row: any) => row.sentido?.nombre ?? "",
    },
    {
      key: "frecuencia",
      label: "Frecuencia",
      render: (row: any) => row.frecuencia?.nombre ?? "",
    },
  ];

  function handleAdd() {
    setModalOpen(true);
    setCodigo("");
    setNombre("");
    setObjetivo("");
    setAlcance("");
    setFormula("");
    setMeta("");
    setFkidtipoindicador([]);
    setFkidunidadmedicion([]);
    setFkidsentido([]);
    setFkidfrecuencia([]);
    setFkidarticulo(["0"]);
  }

  async function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !codigo ||
      !nombre ||
      !objetivo ||
      !alcance ||
      !formula ||
      !meta ||
      !fkidtipoindicador[0] ||
      !fkidunidadmedicion[0] ||
      !fkidsentido[0] ||
      !fkidfrecuencia[0]
    )
      return;

    const body = {
      codigo,
      nombre,
      objetivo,
      alcance,
      formula,
      meta,
      fkidtipoindicador: Number(fkidtipoindicador[0]),
      fkidunidadmedicion: Number(fkidunidadmedicion[0]),
      fkidsentido: Number(fkidsentido[0]),
      fkidfrecuencia: Number(fkidfrecuencia[0]),
      fkidarticulo: fkidarticulo[0] || "0",
      fkidliteral: "0",
      fkidnumeral: "0",
      fkidparagrafo: "0",
    };

    if (editId) {
      await httpClient.put(`indicators/update-indicator/${editId}`, body);
      setSuccessMessage("¡Indicador actualizado exitosamente!");
    } else {
      await httpClient.post("indicators/create-indicator", body);
      setSuccessMessage("¡Indicador creado exitosamente!");
    }

    setModalOpen(false);
    setEditId(null);
    setTimeout(() => setSuccessMessage(""), 4000);
    httpClient
      .get("/indicators/all-indicators")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }

  async function handleDelete(id: string) {
    await httpClient.delete(`indicators/remove-indicator/${id}`);
    setSuccessMessage("¡Indicador eliminado correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
    httpClient
      .get("/indicators/all-indicators")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }

  function handleEdit(row: any) {
    setEditId(row.id);
    setCodigo(row.codigo || "");
    setNombre(row.nombre || "");
    setObjetivo(row.objetivo || "");
    setAlcance(row.alcance || "");
    setFormula(row.formula || "");
    setMeta(row.meta || "");
    setFkidtipoindicador([row.fkidtipoindicador?.toString() || ""]);
    setFkidunidadmedicion([row.fkidunidadmedicion?.toString() || ""]);
    setFkidsentido([row.fkidsentido?.toString() || ""]);
    setFkidfrecuencia([row.fkidfrecuencia?.toString() || ""]);
    setFkidarticulo([row.fkidarticulo?.toString() || "0"]);
    setModalOpen(true);
  }

  return (
    <div className="indicators-container">
      {successMessage && (
        <div className="register-success">{successMessage}</div>
      )}
      <div className="indicators-header">
        <span className="indicators-title">Indicadores</span>
        <button
          className="add-indicator-btn"
          onClick={handleAdd}
          title="Agregar indicador"
        >
          <AddIcon />
        </button>
      </div>
      <Table
        columns={columns}
        data={data}
        actions={(row) => (
          <>
            <button title="Editar" onClick={() => handleEdit(row)}>
              ✏️
            </button>
            <button title="Eliminar" onClick={() => handleDelete(row.id)}>
              🗑️
            </button>
          </>
        )}
      />
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditId(null);
        }}
        title={editId ? "Editar indicador" : "Agregar indicador"}
      >
        <form onSubmit={handleModalSubmit} className="indicator-form">
          <label>
            Código:
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
          <label>
            Objetivo:
            <input
              type="text"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              required
            />
          </label>
          <label>
            Alcance:
            <input
              type="text"
              value={alcance}
              onChange={(e) => setAlcance(e.target.value)}
              required
            />
          </label>
          <label>
            Fórmula:
            <input
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              required
            />
          </label>
          <label>
            Meta:
            <input
              type="text"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              required
            />
          </label>
          <label>
            Tipo indicador:
            <MultiSelect
              options={tipoIndicadorOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id,
              }))}
              value={fkidtipoindicador}
              onChange={(selected) =>
                setFkidtipoindicador(selected.map(String))
              }
              placeholder="Selecciona tipo"
            />
          </label>
          <label>
            Unidad medición:
            <MultiSelect
              options={unidadMedicionOpts.map((o: any) => ({
                label: o.descripcion,
                value: o.id,
              }))}
              value={fkidunidadmedicion}
              onChange={(selected) =>
                setFkidunidadmedicion(selected.map(String))
              }
              placeholder="Selecciona unidad"
            />
          </label>
          <label>
            Sentido:
            <MultiSelect
              options={sentidoOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id,
              }))}
              value={fkidsentido}
              onChange={(selected) => setFkidsentido(selected.map(String))}
              placeholder="Selecciona sentido"
            />
          </label>
          <label>
            Frecuencia:
            <MultiSelect
              options={frecuenciaOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id,
              }))}
              value={fkidfrecuencia}
              onChange={(selected) => setFkidfrecuencia(selected.map(String))}
              placeholder="Selecciona frecuencia"
            />
          </label>
          <label>
            Artículo:
            <MultiSelect
              options={articuloOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id,
              }))}
              value={fkidarticulo}
              onChange={(selected) => setFkidarticulo(selected.map(String))}
              placeholder="Selecciona artículo"
            />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </Modal>
    </div>
  );
}
