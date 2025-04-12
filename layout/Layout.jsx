import NavBar from "../src/components/NavBar/NavBar";
import Footer from "../src/components/Footer/Footer";

export default function Layout({ children, ruta}) {
    
    return (
        <>
            <NavBar activePage={ruta}/>
            {children}
            <Footer />
        </>
    )
}