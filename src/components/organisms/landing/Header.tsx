import { useNavigate } from "react-router-dom";

import Logo from "../../atoms/landing/Logo";
import NavMenu from "../../molecules/landing/NavMenu";
import ButtonLanding from "../../atoms/landing/ButtonLanding";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <Logo />
      <NavMenu />
      <div className="header-actions">
        <ButtonLanding
          className="btnLg login-btn"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </ButtonLanding>
        <ButtonLanding
          className="btnLg register-btn"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </ButtonLanding>
      </div>
    </header>
  );
}
