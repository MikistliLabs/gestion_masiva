import React, {useEffect, useState} from "react";
// import { Outlet, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
function MainLayout({ onLogout }) {
    const [usuario, setUsuario] = useState('');
    useEffect(() => {
        const storedUserType = localStorage.getItem("userName");
        if (localStorage.getItem("userName") !=='') {
            setUsuario(localStorage.getItem("userName"));
        }
    }, [localStorage.getItem("userName")]);

    return (
        <div className="main-layout">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">{ usuario }</a>
                    <div className="d-flex">
                        {  }
                        <button className="btn btn-outline-danger ms-2" onClick={onLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>

            {/* Contenido dinámico según la ruta */}
            <div className="container mt-4">
                <Outlet />
            </div>

            {/* Pie de página */}
            <footer className="footer mt-auto py-3 bg-light">
                <div className="container text-center">
                    <span className="text-muted">© 2025 Prueba técnica Carlos Sánchez</span>
                </div>
            </footer>
        </div>
    );
}

export default MainLayout;