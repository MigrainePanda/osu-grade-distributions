import { useEffect } from "react";

import "./css/contact-page.css";
import Contact from "../components/Contact";

function ContactPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const myEmail = <a href="mailto:tanakan@oregonstate.edu" className="email-link">tanakan@oregonstate.edu</a>;

    return (
        <>
            <div className="contact-content">

                <h1 className="page-title center-text">Get in Touch!</h1>
                <p className="page-text contact-subtitle center-text">Email me at {myEmail} or fill out the form below.</p>

                <Contact />

            </div>
        </>
    )
}

export default ContactPage;