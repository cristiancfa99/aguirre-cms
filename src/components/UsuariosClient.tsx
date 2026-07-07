"use client";
import { useActionState } from "react";
import { createUser, deleteUser, type UserState } from "@/app/actions/users";

type U = { id: string; email: string; name: string | null; role: string };

export default function UsuariosClient({ users }: { users: U[] }) {
  const [state, action, pending] = useActionState<UserState, FormData>(createUser, undefined);
  return (
    <>
      <h1 className="admin-h1">Usuarios</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Gestioná quién puede entrar al panel. Rol Admin: todo. Editor: contenido.</p>

      <form action={action} className="admin-form" style={{ marginBottom: 30 }}>
        <fieldset>
          <legend>Nuevo usuario</legend>
          <div className="grid2">
            <label>Email<input name="email" type="email" required /></label>
            <label>Nombre<input name="name" /></label>
            <label>Contraseña (mín. 8)<input name="password" type="password" required minLength={8} /></label>
            <label>Rol
              <select name="role" defaultValue="EDITOR"><option value="ADMIN">Admin</option><option value="EDITOR">Editor</option></select>
            </label>
          </div>
          {state && <p className={state.ok ? "" : "err"} style={{ color: state.ok ? "#22c55e" : undefined }}>{state.msg}</p>}
          <button className="btn btn-primary" disabled={pending} type="submit" style={{ alignSelf: "flex-start" }}>{pending ? "Creando..." : "Crear usuario"}</button>
        </fieldset>
      </form>

      <div className="admin-table">
        <div className="row head"><span>Email</span><span>Nombre</span><span>Rol</span><span>Acciones</span></div>
        {users.map(u => (
          <div className="row" key={u.id}>
            <span>{u.email}</span><span className="muted">{u.name || "—"}</span><span>{u.role}</span>
            <span className="actions">
              <form action={deleteUser}><input type="hidden" name="id" value={u.id} /><button type="submit" className="danger">Eliminar</button></form>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
