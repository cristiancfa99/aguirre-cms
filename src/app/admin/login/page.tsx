"use client";
import { useActionState } from "react";
import { authenticate } from "./actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(authenticate, undefined);
  return (
    <div className="admin-auth">
      <form className="admin-card" action={action}>
        <h1>Panel · Aguirre</h1>
        <p className="muted">Ingresá para administrar el contenido.</p>
        <label>Email<input name="email" type="email" required autoComplete="username" /></label>
        <label>Contraseña<input name="password" type="password" required autoComplete="current-password" /></label>
        {error && <p className="err">{error}</p>}
        <button className="btn btn-primary" disabled={pending} type="submit">{pending ? "Ingresando..." : "Ingresar"}</button>
      </form>
    </div>
  );
}
