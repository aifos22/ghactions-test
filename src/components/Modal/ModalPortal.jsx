
import ReactDOM from 'react-dom';
import './Modal.css';  // Asegúrate de que tienes los estilos CSS para el modal

const ModalPortal = ({ children, closeModal }) => {
    return ReactDOM.createPortal(
        // Esto es lo que se renderiza en el portal, fuera de la jerarquía normal del DOM
        <div className="modal-overlay" onClick={closeModal}> {/* Cierra el modal si se hace clic fuera */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Evita que el clic en el contenido cierre el modal */}
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') // Esto renderiza el modal dentro de un contenedor específico (modal-root)
    );
};




export default ModalPortal;
