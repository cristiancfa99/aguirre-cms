"use client";
import { useActionState } from "react";
import { changePassword, type PwState } from "@/app/actions/account";

export default function CuentaPage() {
  const [state, action, pending] = useActionState<PwState, FormData>(changePassword, undefined);
  return (
    <div>
      <h1>Mi cuenta</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Cambiá tu contraseña de acceso al panel.</p>
      <form action={action} className="admin-card" style={{ maxWidth: 460 }}>
        <label>Contraseña actual
          <input name="current" type="password" required autoComplete="current-password" />
        </label>
        <label>Nueva contraseña
          <input name="next" type="password" required minLength={8} autoComplete="new-password" />
        </label>
        <label>Repetir nueva contraseña
          <input name="confirm" type="password" required minLength={8} autoComplete="new-password" />
        </label>
        {state && (
          <p className={state.ok ? "ok" : "err"} style={{ color: state.ok ? "#22c55e" : undefined }}>
            {state.msg}
          </p>
        )}
        <button className="btn btn-primary" disabled={pending} type="submit">
          {pending ? "Guardando..." : "Cambiar contraseña"}
        </button>
      </form>
    </div>
  );
}
