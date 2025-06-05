import * as Form from "@radix-ui/react-form";
import * as Toggle from "@radix-ui/react-toggle";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../../api/httpClient";
import Button from "../../components/atoms/landing/ButtonLanding";
import "./login.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const [contrasena, setPassword] = useState("");
  const [mainIcon, setMainIcon] = useState("🐵");

  function handlePasswordBlur() {
    setMainIcon("🐵");
  }

  function handlePasswordInputFocus() {
    setMainIcon(showPassword ? "🙊" : "🙈");
  }

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await httpClient.post("/users/createUser", {
        email,
        contrasena,
        roles: [6],
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2500);
    } catch (err: any) {
      setError(err.response.data.message);
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      {success && (
        <div className="register-success">¡Usuario creado exitosamente!</div>
      )}
      <Form.Root className="login-form" onSubmit={handleSubmit}>
        <div
          className="register-icon"
          title="Volver a login"
          onClick={() => navigate("/login")}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
          }}
        >
          <LoginIcon style={{ fontSize: 32, color: "#321152" }} />
        </div>
        <div className="login-icon">
          <span
            style={{
              fontSize: 100,
              color: "#321152",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            role="img"
            aria-label="Usuario"
          >
            {mainIcon}
          </span>
        </div>

        <h2>Registrarse</h2>
        <Form.Field name="email" className="form-field">
          <Form.Label>Correo</Form.Label>
          <Form.Control asChild>
            <input
              type="email"
              name="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              onFocus={handlePasswordBlur}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="password" className="form-field">
          <Form.Label>Contraseña</Form.Label>
          <div className="password-toggle-field">
            <Form.Control asChild>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={0}
                value={contrasena}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                onFocus={handlePasswordInputFocus}
              />
            </Form.Control>
            <Toggle.Root
              className="toggle-password"
              pressed={showPassword}
              onPressedChange={(pressed) => {
                setShowPassword(pressed);
                setMainIcon(pressed ? "🙊" : "🙈");
              }}
              aria-label="Mostrar contraseña"
              type="button"
              disabled={loading}
            >
              {showPassword ? (
                <VisibilityOff style={{ color: "#321152" }} />
              ) : (
                <Visibility style={{ color: "#321152" }} />
              )}
            </Toggle.Root>
          </div>
        </Form.Field>
        <div className="form-error">{error}</div>
        <Form.Submit asChild>
          <Button
            className="btn login-btn"
            type="submit"
            disabled={loading || !email || !contrasena}
          >
            {loading ? <span className="spinner"></span> : "Registrarse"}
          </Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
