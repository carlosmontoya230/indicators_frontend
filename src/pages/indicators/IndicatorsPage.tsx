import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../components/molecules/table/Table";
import Modal from "../../components/molecules/modal/modal";
import Select from "../../components/atoms/selects/Select";

import "./indicators.css";
import httpClient from "../../api/httpClient";

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
  const [fkidtipoindicador, setFkidtipoindicador] = useState<
    string | number | null
  >(null);
  const [fkidunidadmedicion, setFkidunidadmedicion] = useState<
    string | number | null
  >(null);
  const [fkidsentido, setFkidsentido] = useState<string | number | null>(null);
  const [fkidfrecuencia, setFkidfrecuencia] = useState<string | number | null>(
    null
  );
  const [fkidarticulo, setFkidarticulo] = useState<string | number | null>("0");
  const [fkidliteral, setFkidliteral] = useState<string | number | null>("0");
  const [fkidnumeral, setFkidnumeral] = useState<string | number | null>("0");
  const [fkidparagrafo, setFkidparagrafo] = useState<string | number | null>(
    "0"
  );
  // Options
  const [tipoIndicadorOpts, setTipoIndicadorOpts] = useState<any[]>([]);
  const [unidadMedicionOpts, setUnidadMedicionOpts] = useState<any[]>([]);
  const [sentidoOpts, setSentidoOpts] = useState<any[]>([]);
  const [frecuenciaOpts, setFrecuenciaOpts] = useState<any[]>([]);
  const [articuloOpts, setArticuloOpts] = useState<any[]>([]);
  const [literalOpts, setLiteralOpts] = useState<any[]>([]);
  const [numeralOpts, setNumeralOpts] = useState<any[]>([]);
  const [paragrafoOpts, setParagrafoOpts] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsData, setDetailsData] = useState<any | null>(null);

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
    httpClient
      .get("legal/all/literals")
      .then((res) => setLiteralOpts(res.data));
    httpClient
      .get("legal/all/numerals")
      .then((res) => setNumeralOpts(res.data));
    httpClient
      .get("legal/all/paragrafos")
      .then((res) => setParagrafoOpts(res.data));
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
    setFkidtipoindicador(null);
    setFkidunidadmedicion(null);
    setFkidsentido(null);
    setFkidfrecuencia(null);
    setFkidarticulo("0");
    setFkidliteral("0");
    setFkidnumeral("0");
    setFkidparagrafo("0");
  }

  function handleEdit(row: any) {
    setEditId(row.id);
    setCodigo(row.codigo || "");
    setNombre(row.nombre || "");
    setObjetivo(row.objetivo || "");
    setAlcance(row.alcance || "");
    setFormula(row.formula || "");
    setMeta(row.meta || "");
    setFkidtipoindicador(row.fkidtipoindicador?.toString() || "");
    setFkidunidadmedicion(row.fkidunidadmedicion?.toString() || "");
    setFkidsentido(row.fkidsentido?.toString() || "");
    setFkidfrecuencia(row.fkidfrecuencia?.toString() || "");
    setFkidarticulo(row.fkidarticulo?.toString() || "0");
    setFkidliteral(row.fkidliteral?.toString() || "0");
    setFkidnumeral(row.fkidnumeral?.toString() || "0");
    setFkidparagrafo(row.fkidparagrafo?.toString() || "0");
    setModalOpen(true);
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
      !fkidtipoindicador ||
      !fkidunidadmedicion ||
      !fkidsentido ||
      !fkidfrecuencia
    )
      return;

    const body = {
      codigo,
      nombre,
      objetivo,
      alcance,
      formula,
      meta,
      fkidtipoindicador: Number(fkidtipoindicador),
      fkidunidadmedicion: Number(fkidunidadmedicion),
      fkidsentido: Number(fkidsentido),
      fkidfrecuencia: Number(fkidfrecuencia),
      fkidarticulo: fkidarticulo || "0",
      fkidliteral: fkidliteral || "0",
      fkidnumeral: fkidnumeral || "0",
      fkidparagrafo: fkidparagrafo || "0",
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

  async function handleViewDetails(id: string) {
    const res = await httpClient.get(`indicators/indicator/${id}`);
    setDetailsData(res.data);
    setDetailsOpen(true);
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
            <button
              title="Ver detalles"
              onClick={() => handleViewDetails(row.id)}
            >
              👁️
            </button>
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
            <Select
              options={tipoIndicadorOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id.toString(),
              }))}
              value={fkidtipoindicador}
              onChange={setFkidtipoindicador}
              placeholder="Selecciona tipo"
            />
          </label>
          <label>
            Unidad medición:
            <Select
              options={unidadMedicionOpts.map((o: any) => ({
                label: o.descripcion,
                value: o.id.toString(),
              }))}
              value={fkidunidadmedicion}
              onChange={setFkidunidadmedicion}
              placeholder="Selecciona unidad"
            />
          </label>
          <label>
            Sentido:
            <Select
              options={sentidoOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id.toString(),
              }))}
              value={fkidsentido}
              onChange={setFkidsentido}
              placeholder="Selecciona sentido"
            />
          </label>
          <label>
            Frecuencia:
            <Select
              options={frecuenciaOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id.toString(),
              }))}
              value={fkidfrecuencia}
              onChange={setFkidfrecuencia}
              placeholder="Selecciona frecuencia"
            />
          </label>
          <label>
            Artículo:
            <Select
              options={articuloOpts.map((o: any) => ({
                label: o.nombre,
                value: o.id.toString(),
              }))}
              value={fkidarticulo}
              onChange={setFkidarticulo}
              placeholder="Selecciona artículo"
            />
          </label>
          <label>
            Literal:
            <Select
              options={literalOpts.map((o: any) => ({
                label: o.descripcion,
                value: o.id,
              }))}
              value={fkidliteral}
              onChange={setFkidliteral}
              placeholder="Selecciona literal"
            />
          </label>
          <label>
            Numeral:
            <Select
              options={numeralOpts.map((o: any) => ({
                label: o.descripcion,
                value: o.id,
              }))}
              value={fkidnumeral}
              onChange={setFkidnumeral}
              placeholder="Selecciona numeral"
            />
          </label>
          <label>
            Parágrafo:
            <Select
              options={paragrafoOpts.map((o: any) => ({
                label: o.descripcion,
                value: o.id,
              }))}
              value={fkidparagrafo}
              onChange={setFkidparagrafo}
              placeholder="Selecciona parágrafo"
            />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </Modal>
      <Modal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title="Detalles del Indicador"
      >
        {detailsData ? (
          <form className="indicator-form">
            <label>
              ID:
              <input type="text" value={detailsData.id} disabled />
            </label>
            <label>
              Código:
              <input type="text" value={detailsData.codigo} disabled />
            </label>
            <label>
              Nombre:
              <input type="text" value={detailsData.nombre} disabled />
            </label>
            <label>
              Objetivo:
              <input type="text" value={detailsData.objetivo} disabled />
            </label>
            <label>
              Alcance:
              <input type="text" value={detailsData.alcance} disabled />
            </label>
            <label>
              Fórmula:
              <input type="text" value={detailsData.formula} disabled />
            </label>
            <label>
              Meta:
              <input type="text" value={detailsData.meta} disabled />
            </label>
            <label>
              Tipo indicador:
              <input
                type="text"
                value={
                  detailsData.tipoIndicador?.nombre ||
                  detailsData.fkidtipoindicador
                }
                disabled
              />
            </label>
            <label>
              Unidad medición:
              <input
                type="text"
                value={
                  detailsData.unidadMedicion?.descripcion ||
                  detailsData.fkidunidadmedicion
                }
                disabled
              />
            </label>
            <label>
              Sentido:
              <input
                type="text"
                value={detailsData.sentido?.nombre || detailsData.fkidsentido}
                disabled
              />
            </label>
            <label>
              Frecuencia:
              <input
                type="text"
                value={
                  detailsData.frecuencia?.nombre || detailsData.fkidfrecuencia
                }
                disabled
              />
            </label>
            <label>
              Artículo:
              <input type="text" value={detailsData.fkidarticulo} disabled />
            </label>
            <label>
              Literal:
              <input type="text" value={detailsData.fkidliteral} disabled />
            </label>
            <label>
              Numeral:
              <input type="text" value={detailsData.fkidnumeral} disabled />
            </label>
            <label>
              Parágrafo:
              <input type="text" value={detailsData.fkidparagrafo} disabled />
            </label>
            <label>
              Responsables:
              <textarea
                value={
                  detailsData.responsablesPorIndicador
                    ?.map((r: any) => r.fkidresponsable)
                    .join(", ") || ""
                }
                disabled
              />
            </label>
            <label>
              Fuentes:
              <textarea
                value={
                  detailsData.fuentesPorIndicador
                    ?.map((f: any) => f.fkidfuente)
                    .join(", ") || ""
                }
                disabled
              />
            </label>
            <label>
              Variables:
              <textarea
                value={
                  detailsData.variablesPorIndicador
                    ?.map(
                      (v: any) =>
                        `Dato: ${v.dato}, Usuario: ${v.fkemailusuario}, Fecha: ${v.fechadato}`
                    )
                    .join("\n") || ""
                }
                disabled
              />
            </label>
            <label>
              Resultados:
              <textarea
                value={
                  detailsData.resultadosIndicador
                    ?.map(
                      (r: any) =>
                        `Resultado: ${r.resultado}, Fecha: ${r.fechacalculo}`
                    )
                    .join("\n") || ""
                }
                disabled
              />
            </label>
            <label>
              Representaciones visuales:
              <textarea
                value={
                  detailsData.representVisualPorIndicador
                    ?.map((v: any) => ` Visual: ${v.fkidrepresenvisual}`)
                    .join("\n") || ""
                }
                disabled
              />
            </label>
          </form>
        ) : (
          <div>Cargando...</div>
        )}
      </Modal>
    </div>
  );
}
