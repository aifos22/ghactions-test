import NavBar from "../../src/components/NavBar/NavBar";
import Footer from "../../src/components/Footer/Footer";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';



export default function ContactoPage() {
    return (
        <main className="contenedor-contacto">
            <div className="contenedor-contacto__datos">
                <form className="contenedor-contacto__datos__form">
                    <input type="text" placeholder="Nombre" required name="nombre" />
                    <input type="email" placeholder="Correo" required name="email" />
                    <input type="text" placeholder="Asunto" required name="asunto" />
                    <textarea placeholder="Mensaje" required name="mensaje"></textarea>
                    <button className="btn-submit" type="submit">
                        <span className="btn-text">Enviar</span>
                        <span className="btn-icon material-symbols-outlined"><ArrowCircleRightIcon /></span>
                    </button>
                </form>

                {/* Mensaje de confirmación que aparecerá después de enviar el formulario */}
                <p id="mensaje-confirmacion" style={{ color: "#f07604", fontWeight: "bold", marginTop: "10px" }}>
                    {/* Aquí puedes agregar texto dinámico desde JavaScript si lo necesitas */}
                </p>

                <section className="contenedor-contacto__datos__mapa">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d428081.0604840368!2d-71.9007460671875!3d-33.0463747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689e127ee1e22c5%3A0x6297104bc13c872c!2sSala%20Insomnia%20Alternativa%20de%20Cine!5e0!3m2!1ses!2scl!4v1729562553311!5m2!1ses!2scl"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>
            </div>
        </main>
    );
}

