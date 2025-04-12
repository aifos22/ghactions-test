// Este componente tiene un formulario de login sencillo que hace uso del context para simular un login exitoso.
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../src/App";

import { encryptData, decryptData } from "../src/utils/encrypter";
import { usuarios } from "../data/usuarios";
import useAuth from "../src/hooks/useAuth"; // Importamos el hook useAuth

// import { nuevoToken } from "../src/utils/jwt";


export default function LoginPage() {
    const navigate = useNavigate();
    const { formData, formErrors, isSubmitEnabled, handleChange, handleLogin } = useAuth(); // Usamos el hook

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <img className="navbar__logo navbar-brand" src="../src/assets/logo.png" alt="Logo de la clínica" />
                <h1 className="text-center">Iniciar Sesión</h1>
            </div>

            <div className="container d-flex justify-content-center align-items-start vh-100">
                <form id="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && (
                            <div className="alert alert-danger">{formErrors.email}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {formErrors.password && (
                            <div className="alert alert-danger">{formErrors.password}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isSubmitEnabled}
                    >
                        Iniciar Sesión
                    </button>
                    <p className="text-center mt-2 text-info">Regístrate aquí</p>
                </form>
            </div>
        </>
    );
};