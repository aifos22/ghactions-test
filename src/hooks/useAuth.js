// src/hooks/useAuth.js
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App"; // Importa tu contexto de usuario
import { usuarios } from "../../data/usuarios"; // Asumiendo que tienes una lista de usuarios para validar
import { encryptData, decryptData } from "../utils/encrypter"; // Funciones de encriptado y desencriptado
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const { setUser } = useContext(UserContext); // Accedes al contexto del usuario para guardar el estado del login
    const navigate = useNavigate(); // Hook para navegación
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Para mostrar mensajes de error generales

    // Handle changes en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Validación de campos del formulario
    const validateForm = () => {
        const errors = {};
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            errors.email = "Por favor, ingresa un correo válido.";
        if (!formData.password)
            errors.password = "Por favor, ingresa una contraseña.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Manejo del login
    const handleLogin = async (e) => {
 
        if (validateForm()) {
            try {
                // Aquí se busca al usuario desde la lista de usuarios
                const foundUser = usuarios.find(
                    (usuario) => usuario.email === formData.email
                );

                if (foundUser) {
                    // // Encripta la contraseña
                    // const encryptedPassword = encryptData(formData.password);
                    // console.log("Contraseña encriptada:", encryptedPassword);

                    // Compara la contraseña ingresada con la contraseña en la base de datos
                    if (decryptData(foundUser.password) === formData.password) {
                        setUser(foundUser); // Guarda el usuario en el contexto
                        alert("Inicio de sesión exitoso");
                        navigate("/"); // Redirige a la página principal
                    } else {
                        alert("Contraseña incorrecta");
                    }
                } else {
                    alert("Usuario no encontrado. Debe registrarse.");
                }
            } catch (error) {
                console.error("Error durante el login:", error);
                setErrorMessage("Hubo un error al intentar iniciar sesión. Intenta de nuevo.");
            }
        } else {
            console.log("Formulario con errores");
        }
    };

    // Habilita o deshabilita el botón de envío dependiendo de si el formulario es válido
    useEffect(() => {
        if (formData.email && formData.password) {
            setIsSubmitEnabled(true);
        } else {
            setIsSubmitEnabled(false);
        }
    }, [formData]);

    return {
        formData,
        formErrors,
        isSubmitEnabled,
        handleChange,
        handleLogin,
        errorMessage,
    };
}

