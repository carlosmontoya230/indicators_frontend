import SectionTitle from "../../atoms/landing/SectionTittle";
import TeamMemberCard from "../../molecules/landing/TeamMemberCard";

// Importa todos los assets
import softwareMedida from "../../../assets/software-medida.jpg.jpg";
import aplicacionesMoviles from "../../../assets/tipos-de-aplicaciones-móviles.jpg";
import automatizacion from "../../../assets/servicios.jpg";
import oficinaAbierta from "../../../assets/Oficina-Abierta.jpg";
import userCEO from "../../../assets/userCEO.jpg";
import consultoria from "../../../assets/consultoria.jpg";

const team = [
  {
    name: "Carlos Yepes",
    role: "CEO",
    email: "carlosmnontoya@Edunova ",
    img: userCEO,
  },
  {
    name: "Carlos Yepes",
    role: "CTO",
    email: "carlosmnontoya@Edunova",
    img: userCEO,
  },
  {
    name: "Carlos Yepes",
    role: "Desarrolladora Frontend",
    email: "carlosmnontoya@Edunova",
    img: userCEO,
  },
  {
    name: "Carlos Yepes",
    role: "Desarrollador Backend",
    email: "carlosmnontoya@Edunova",
    img: userCEO,
  },
];

export default function CompanySection() {
  return (
    <div className="company-section">
      <section id="quienes-somos" className="section-description">
        <SectionTitle>Quiénes somos</SectionTitle>
        <p>
          En TechNova Solutions somos una empresa de tecnología dedicada a
          transformar ideas en soluciones digitales innovadoras. Nuestro equipo
          multidisciplinario está comprometido con el desarrollo de software de
          alta calidad, la consultoría tecnológica y la creación de productos
          que impulsan la eficiencia y el crecimiento de nuestros clientes.
          Creemos en la excelencia, la creatividad y la adaptación constante a
          los cambios del entorno digital, acompañando a organizaciones de todos
          los sectores en su proceso de transformación tecnológica. Nuestra
          misión es ser aliados estratégicos, aportando valor y confianza en
          cada proyecto.
        </p>
        <img src={oficinaAbierta} alt="Oficina" className="section-img" />
      </section>

      <section id="servicios">
        <SectionTitle>Servicios y Productos</SectionTitle>
        <div className="services-grid">
          <div className="service-card">
            <img
              src={softwareMedida}
              alt="Software a medida"
              className="service-icon"
            />
            <h3>Desarrollo de software a medida</h3>
            <p>
              Creamos soluciones personalizadas que se adaptan a las necesidades
              específicas de tu empresa, optimizando procesos y mejorando la
              productividad.
            </p>
          </div>
          <div className="service-card">
            <img
              src={consultoria}
              alt="Consultoría tecnológica"
              className="service-icon"
            />
            <h3>Consultoría tecnológica</h3>
            <p>
              Te asesoramos en la transformación digital de tu negocio,
              implementando las mejores prácticas y tecnologías del mercado.
            </p>
          </div>
          <div className="service-card">
            <img
              src={aplicacionesMoviles}
              alt="Aplicaciones móviles y web"
              className="service-icon"
            />
            <h3>Aplicaciones móviles y web</h3>
            <p>
              Desarrollamos apps modernas, intuitivas y seguras para
              dispositivos móviles y plataformas web, mejorando la experiencia
              de tus usuarios.
            </p>
          </div>
          <div className="service-card">
            <img
              src={automatizacion}
              alt="Automatización de procesos"
              className="service-icon"
            />
            <h3>Automatización de procesos</h3>
            <p>
              Implementamos herramientas de automatización que reducen errores,
              ahorran tiempo y permiten a tu equipo enfocarse en tareas
              estratégicas.
            </p>
          </div>
        </div>
      </section>

      <section id="equipo">
        <SectionTitle>Equipo</SectionTitle>
        <div className="team-grid">
          {team.map((member) => (
            <TeamMemberCard key={member.email} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}
