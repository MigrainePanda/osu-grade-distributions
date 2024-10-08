import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./css/about-page.css";

function AboutPage() {

    const PUBLIC_RECORDS_URL = "https://communications.oregonstate.edu/public-records-request";

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Grade Distributions | About';
    });

    return (
        <>
            <div className="content-inner">

                <div className="content-title-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title page-title block-title">About</h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-subtitle page-text">Hi, my name is Nicholas Tanaka, and I&apos;m a student at Oregon State University. I created this website because I wanted to see how other students have done in my courses in the past. I hope you find this site useful for your degree planning, and I wish you the best of luck in your future classes!</p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>
                
                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title block-title">Support</h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">If you have any questions, concerns, or feedback, please let me know.</p>
                        </div>
                        <NavLink to={"/contact"} className={"page-action page-text"}>Contact Me</NavLink>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title block-title">Data Source</h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">All data was acquired from FOIA (Freedom of Information Act) requests to the Oregon State University Public Records Officer.</p>
                            <p className="content-block-text page-text">This website is not affiliated with Oregon State University.</p>
                        </div>
                        <a target="_blank" rel="noopener noreferrer" href={PUBLIC_RECORDS_URL} className="page-action page-text external-link">
                            Learn more <img src="/share-box-fill.svg" alt="External link as arrow pointing out of box" className="image-external-link"></img>
                        </a>
                    </div>
                </div>

                <div className="separator"></div>

            </div>
        </>
    );
}

export default AboutPage;