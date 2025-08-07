import { Navigate } from "react-router-dom";
import { usuarioAtual } from "../../utils/auth";
import type { JSX } from "react";

export default function PrivateRoute({children}: {children: JSX.Element}) {
    const user = usuarioAtual();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}