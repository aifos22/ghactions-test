import React from "react";
import PropTypes from "prop-types";  // Importamos PropTypes


export default function Footer() {



    return (
        <footer className="footer row gap-3">

            <div className="footer__rrss">
                <img src="./src/assets/facebook.png" alt=" " />
                <img src="./src/assets/whatsapp.png" alt=" " />
                <img src="./src/assets/logotipo-de-instagram.png" alt=" " />
            </div>

            <div className="footer__legal">
                <h6>
                    &copy; 2024 | Clínica Cuerpo y Alma S.A | Todos los derechos reservados
                </h6>
            </div>

        </footer>
    )
};

// No hay props directas en este componente, pero si algún día se añaden, se podrían verificar:
Footer.propTypes = {
    // En caso de agregar imágenes como props más adelante, se puede usar PropTypes aquí
    // facebookImg: PropTypes.string.isRequired,
    // whatsappImg: PropTypes.string.isRequired,
    // instagramImg: PropTypes.string.isRequired,
};
