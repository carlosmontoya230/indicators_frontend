import logo from "../../../assets/logo.svg";

export default function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="Logo Empresa" height={120} />
      <span>Edunova Solutions</span>
    </div>
  );
}
