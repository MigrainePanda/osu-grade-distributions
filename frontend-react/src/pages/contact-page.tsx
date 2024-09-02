import { useState, useEffect } from "react";

import "./css/contact-page.css";
import Contact from "../components/Contact";

function ContactPage() {

    const [result, setResult] = useState<string>("");
    const myEmail = <a href="mailto:tanakan@oregonstate.edu" className="email-link">tanakan@oregonstate.edu</a>;

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Grade Distributions | Contact';
    });

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [result, setResult]);

    const resultElement = (
        <>
            <div className="content-block">
                <div className="content-block-inner">
                    <div className="contact-result page-text center-text">{result}</div>
                </div>
            </div>
            <div className="separator"></div>
        </>
    );
    
    return (
        <>
            <div className="content-inner">

                {result !== "" && resultElement}

                <div className="content-title-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title page-title block-title">Get in Touch!</h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">Email me at {myEmail} or fill out the form below.</p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title block-title">Form</h1>
                        <Contact setResult={setResult} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContactPage;