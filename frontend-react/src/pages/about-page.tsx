import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./css/about-page.css";

function AboutPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <>
            <div className="about-content">
                <h1 className="page-title center-text">About</h1>

                <div className="about-text-container">
                    <p className="page-text about-text">Hi, my name is Nicholas Tanaka, and I&apos;m a student at Oregon State University. I created this website because I wanted to see how other students have done in past courses.</p>
                    
                    <p className="page-text about-text">I hope you find this site useful for your degree planning and wish you the best of luck in your classes! If you have any questions, concerns, or feedback, please let me know <NavLink to={"/contact"} className={"about-contact-link"}>here</NavLink>. </p>

                    <p className="page-text-small about-data-source">Grade data was acquired from a FOIA (Freedom of Information Act) request to the Oregon State University Public Records Officer.</p>

                    <p className="page-text-small">This website is not affiliated with Oregon State University.</p>
                </div>

                <p className="page-text-small about-copyright center-text">&copy; 2024 Nicholas Tanaka</p>

            </div>
        </>
    );
}

export default AboutPage;