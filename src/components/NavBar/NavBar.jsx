
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; //este Hook permite redirigir a otra página

import { AppContext } from '../../App';
import { UserContext } from '../../App';
import PropTypes from 'prop-types'; // Importamos PropTypes

import { Login, Logout } from '@mui/icons-material';


function NavBar({ activePage }) {
    const { contadorReservas } = useContext(AppContext);
    const { user, setUser } = useContext(UserContext);

    console.log(activePage);

    const navigate = useNavigate();

    function isActive(page) {
        if (page == activePage) {
            return "navbar__selected-list";
        } else {
            return null;
        }
    }

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg">

            <div className="container-fluid">

                <img className="navbar__logo navbar-brand" src="../src/assets/logo.png" alt="Logo de la clínica" />


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarTogglerDemo02">

                    <ul className="navbar__lista navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={`navbar__elemento nav-item ${isActive("inicio")}`}>
                            <button className="nav-link" onClick={() => { navigate("/") }}>Inicio</button>
                        </li>
                        <li className={`navbar__elemento nav-item ${isActive("equipo")}`}>
                            <button className="nav-link" onClick={() => { navigate("/equipo") }}>Equipo médico</button>
                        </li>
                        <li className={`navbar__elemento nav-item ${isActive("contacto")}`}>
                            <button className="nav-link" onClick={() => { navigate("/contacto") }} >Contacto</button>
                        </li>
                    </ul>

                    <div className="navbar__cont-boton">
                        <div className="navbar__boton d-lg-flex ">
                            {/*<span className="material-symbols-outlined navbar__boton__icon">calendar_month</span>*/}
                            <CalendarMonthIcon htmlColor="#42adbc" />
                            <span className="navbar__boton__text">Reservar cita</span>
                        </div>
                        
                        {user ? (
                            <div className="navbar__boton d-lg-flex">
                                {/* Reservas: <span className="navbar__boton__contador__numero">{contadorReservas}</span> */}
                                <Logout htmlColor='#42adbc'/>
                                <span onClick={ handleLogout } className="navbar__boton__text">Cerrar Sesión</span>
                            </div>
                        ) : (
                            <div className="navbar__boton d-lg-flex">
                                {/* Reservas: <span className="navbar__boton__contador__numero">{contadorReservas}</span> */}
                                <Login htmlColor='#42adbc'/>
                                <span onClick={() => { navigate('/login') }} className="navbar__boton__text">Iniciar Sesión</span>
                            </div>
                        )} 

                    </div>

                </div>
            </div>
        </nav>
    )
}

// Definimos las PropTypes para validar las props que recibe el componente
NavBar.propTypes = {
    activePage: PropTypes.string.isRequired, // activePage debe ser una cadena de texto
};

export default NavBar;