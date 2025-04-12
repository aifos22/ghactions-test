
import PropTypes from "prop-types";
import React from "react";
import "./ServiceCard.css";

const ServiceCard = React.memo(function ServiceCard({ img, title, description }) {
    console.log("Rendering ServiceCard:", title);

    return (
        <div className="services__card col col-lg-3 col-sm-8 col-xs-12">
            <img src={img} alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="#" className="btn btn-primary services__card__more">Conoce más aquí</a>
            </div>
        </div>
    );
});

// PropTypes para asegurarse de que las props sean del tipo correcto
ServiceCard.propTypes = {
    img: PropTypes.string.isRequired,  // La imagen debe ser una cadena de texto
    title: PropTypes.string.isRequired,  // El título debe ser una cadena de texto
    description: PropTypes.string.isRequired,  // La descripción debe ser una cadena de texto
};

export default ServiceCard;
