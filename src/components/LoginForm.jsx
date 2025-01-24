import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
// import axiosInstance from '../axiosInstance';

import axios from "axios";

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Usamos useNavigate para obtener la función navigate
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // solicta el token de acceso
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            // Pasa los parametros de acceso a la función de logueo
            onLogin(response.data.token_data.access_token, response.data.user.user_type, response.data.user.name);
            // Redirigir al dashboard o lista de personas
            navigate("/lista-personas"); 
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row w-100 justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="p-4 border shadow-lg rounded">
                        <h3 className="text-center mb-4">Inicio de sesión</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="form-control" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="form-control" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;