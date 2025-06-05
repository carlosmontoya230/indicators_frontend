import * as Form from "@radix-ui/react-form";
import * as Toggle from "@radix-ui/react-toggle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../../api/httpClient";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import Button from "../../components/atoms/landing/ButtonLanding";
import "./login.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const res = await httpClient.post("/auth-sso/login", { email, password });
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("roles", JSON.stringify(res.data.user.roles));
      navigate("/home");
    } catch (err: any) {
      setError("Credenciales incorrectas");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <Form.Root className="login-form" onSubmit={handleSubmit}>
        <div
          className="register-icon"
          title="Registrarse"
          onClick={() => navigate("/register")}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
          }}
        >
          <PersonAddIcon style={{ fontSize: 32, color: "#321152" }} />
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
        <h2>Iniciar sesión</h2>
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
                value={password}
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
            disabled={loading || !email || !password}
          >
            {loading ? <span className="spinner"></span> : "Entrar"}
          </Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
