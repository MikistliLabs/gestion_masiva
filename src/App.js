import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import PersonTable from "./components/PersonTable";
import FileUpload from "./components/FileUpload";
import PersonDetail from "./components/PersonDetail"; // Modal de detalles
import MainLayout from "./MainLayout";
import axios from 'axios';

function App() {
    const [isLogueado, setIsLogueado] = useState(false); // Estado para saber si el usuario está logueado
    const [userType, setUserType] = useState(null); // Tipo de usuario
    const [userName, setUserName] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null); // Persona seleccionada
    const [showModal, setShowModal] = useState(false); // Control del modal
    const token = localStorage.getItem('authToken'); // recupera el token Oauth

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        const token = localStorage.getItem("authToken");
        if (storedUserType && token) {
            setUserType(Number(storedUserType)); // Asegúrate de que sea un número
            setIsLogueado(true);
        }
    }, []);
    // maneja el logueo, cambia el estaus del estado de logueo y setea en localstorage la información del usuario en sesión
    const handleLogin = (token, type_user, name) => {
        setIsLogueado(true);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userType", type_user);
        localStorage.setItem("userName", name);
        setUserType(type_user);
    };
    // Maneja el cierre de sesión
    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/api/logout', {
            headers: { 
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
        });
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        setIsLogueado(false);
        setUserType(null);
    };

    const handleSelectPerson = (persona) => {
        setSelectedPerson(persona); // Al seleccionar persona, la pasamos al modal
        setShowModal(true); // Mostramos el modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Cerramos el modal
        setSelectedPerson(null); // Limpiamos la persona seleccionada
    };

    return (
        <Router>
            <Routes>
                {/* Ruta para login */}
                <Route
                    path="/login"
                    element={
                        isLogueado ? (
                            <Navigate to="/lista-personas" replace />
                        ) : (
                            <LoginForm onLogin={handleLogin} />
                        )
                    }
                />

                {/* Rutas protegidas dentro del layout */}
                {isLogueado && (
                    <Route path="/" element={<MainLayout onLogout={handleLogout} />}>
                        <Route
                            path="/lista-personas"
                            element={
                                <>
                                    {userType === 1 && <FileUpload />}
                                    <PersonTable onSelectPerson={handleSelectPerson} />
                                </>
                            }
                        />
                    </Route>
                )}

                {/* Redirección por defecto */}
                <Route
                    path="*"
                    element={<Navigate to={isLogueado ? "/lista-personas" : "/login"} replace />}
                />
            </Routes>

            {/* Modal para ver detalles de persona */}
            {selectedPerson && (
                <PersonDetail
                    show={showModal}
                    person={selectedPerson}
                    onClose={handleCloseModal}
                />
            )}
        </Router>
    );
}

export default App;