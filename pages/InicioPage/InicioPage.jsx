import React, { useRef } from "react";
import ServiceList from "../../src/components/ServiceList/ServiceList";
import { useContext } from "react";
import { UserContext } from "../../src/App";
import "./InicioPage.css";


export default function InicioPage() {
    const { user } = useContext(UserContext);
    const sectionsRef = {
        about: useRef(null),
        services: useRef(null),
    };

    const scrollToSection = (section) => {
        sectionsRef[section]?.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <header className="header-inicio">
                <h1>
                    { user && (<>{`Hola ${user.nombre}`} <br /></> ) } 
                    <span id="nombre-bienvenida"></span> Te damos la bienvenida a <br />
                    <b>
                        <span className="highlight-text">Clínica Cuerpo y Alma</span>
                    </b>
                </h1>
                {/* <nav>
                    <button onClick={() => scrollToSection("about")}>Sobre la Clínica</button>
                    <button onClick={() => scrollToSection("services")}>Servicios</button>
                </nav> */}
            </header>

            <section ref={sectionsRef.about} className="hospital-info">
                <h3>Sobre la Clínica</h3>
                <p>
                    En la Clínica Cuerpo y Alma, nos dedicamos a ofrecer atención médica de calidad,
                    con un enfoque integral para el bienestar de nuestros pacientes.
                </p>
            </section>

            <section ref={sectionsRef.services} className="m-4">
                <h2>Servicios Destacados</h2>
                <ServiceList />
            </section>
        </>
    );
}

