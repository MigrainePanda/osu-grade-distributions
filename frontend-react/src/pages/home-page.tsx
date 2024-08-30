import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./css/home-page.css";

function HomePage() {
    
    useEffect(() => {
        document.title = 'Grade Distributions | Home';
    });

    return (
        <>
            <div className="content-inner">

                <div className="content-title-block">
                    <div className="content-block-inner">
                        <h1 className="home-title center-text">Oregon State University</h1>
                        <h2 className="home-subtitle center-text">Grade Distributions</h2>
                    </div>
                </div>
                
                <div className="separator"></div>

                <div className="grid-block">
                    <div className="content-block">
                        <div className="content-block-inner">
                            <h1 className="content-block-title block-title">Getting Started</h1>
                            <div className="content-block-text-container">
                                <p className="content-block-text page-text">palceholder</p>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-separator"></div>
                    <div className="content-block">
                        <div className="content-block-inner">
                            <h1 className="content-block-title block-title">Ready to go?</h1>
                            <div className="content-block-text-container">
                                <p className="content-block-text page-text">Find out how other students performed in your classes!</p>
                            </div>
                            <NavLink to={"/courses"} className={"page-action page-text"}>Get Started</NavLink>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomePage;