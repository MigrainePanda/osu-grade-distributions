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

                <div className="content-home-title-block">
                    <div className="content-block-inner">
                        <h1 className="home-title center-text">Oregon State University</h1>
                        <h2 className="home-subtitle center-text">Grade Distributions</h2>
                    </div>
                </div>
                
                <div className="separator"></div>

                <div className="grid-block">
                    <div className="content-block">
                        <div className="content-block-inner">
                            <h1 className="content-block-title block-title">Made for students by students</h1>
                            <p className="content-block-text page-text">Search through 20,000+ courses to find information that fits your needs, and use data to help make decisions during course registration.</p>
                        </div>
                    </div>
                    <div className="mobile-separator"></div>
                    <div className="content-block">
                        <div className="content-block-inner">
                            <h1 className="content-block-title block-title">Data centered on reliability</h1>
                            <p className="content-block-text page-text">Because our data is sourced from official Oregon State courses, our visualizations display real course data from real students.</p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                <img src="/mu.webp" alt="The lawn and front of the Memoral Union in the middle of the day" className="home-image"></img>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="home-features-title-block center-center">
                        <h1 className="content-block-title block-title">Features that support you</h1>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="grid-block">
                    <div className="content-block">
                        <div className="home-features-block">
                            <h1 className="content-block-title block-title">Grade Breakdown</h1>
                            <p className="content-block-text page-text">Explore the distribution of grades for courses since 2019</p>
                        </div>
                    </div>
                    <div className="mobile-separator"></div>
                    <div className="content-block">
                        <div className="home-features-block">
                            <h1 className="content-block-title block-title">Control the Data</h1>
                            <p className="content-block-text page-text">Uncover results by filtering the year or term</p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="grid-block">
                    <div className="content-block">
                        <div className="home-features-block">
                            <h1 className="content-block-title block-title">Pass Rate</h1>
                            <p className="content-block-text page-text">Discover the passing percentage of your classes</p>
                        </div>
                    </div>
                    <div className="mobile-separator"></div>
                    <div className="content-block">
                        <div className="home-features-block">
                            <h1 className="content-block-title block-title">Student Count</h1>
                            <p className="content-block-text page-text">Examine how the number of students changes</p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="home-getstarted-block center-center">
                        <h1 className="content-block-title block-title">Ready to go?</h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">Find out today how other students performed in your classes!</p>
                        </div>
                        <NavLink to={"/courses"} className={"page-action page-text"}>Get started</NavLink>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomePage;