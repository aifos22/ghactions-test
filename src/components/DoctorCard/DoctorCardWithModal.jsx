import React from "react";
import PropTypes from "prop-types";  // Importamos PropTypes
import withModal from "../WithModal/withModal";

const DoctorCard = ({ nombre, especialidad, openModal }) => {
    return (
        <div className="doctor-card" onClick={openModal}>
            <h3>{nombre}</h3>
            <p>{especialidad}</p>
        </div>
    );
};



export default withModal(DoctorCard);

