import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./css/about-page.css";

function AboutPage() {
    const PUBLIC_RECORDS_URL =
        "https://communications.oregonstate.edu/public-records-request";

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Grade Distributions | About";
    });

    return (
        <>
            <div className="content-inner">
                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title page-title">
                            About
                        </h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-subtitle page-text">
                                Hi, my name is Nicholas Tanaka, and I&apos;m a
                                student at Oregon State University. I created
                                this website because I wanted to see how other
                                students have done in my courses in the past. I
                                hope you find this site useful for your degree
                                planning, and I wish you the best of luck in
                                your future classes!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="grid-block">
                    <div className="content-block">
                        <div className="content-block-inner">
                            <h1 className="content-block-title block-title">
                                Made for students by students
                            </h1>
                            <p className="content-block-text page-text">
                                Search through 20,000+ courses to find
                                information that fits your needs, and use data
                                to help make decisions during course
                                registration.
                            </p>
                        </div>
                    </div>
                    <div className="mobile-separator"></div>
                    <div className="content-block">
                        <div className="content-block-inner">
                            <h1 className="content-block-title block-title">
                                Data centered on reliability
                            </h1>
                            <p className="content-block-text page-text">
                                Because our data is sourced from official Oregon
                                State courses, our visualizations display real
                                course data from real students.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                <img
                    src="/mu.webp"
                    alt="The lawn and front of the Memoral Union in the middle of the day"
                    className="home-image"
                ></img>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="home-features-title-block center-center">
                        <h1 className="content-block-title block-title">
                            Features that support you
                        </h1>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="grid-block">
                    <div className="content-block">
                        <div className="home-features-block">
                            <h1 className="content-block-title block-title">
                                Grade Breakdown
                            </h1>
                            <p className="content-block-text page-text">
                                Explore the distribution of grades for courses
                                since 2019
                            </p>
                        </div>
                    </div>
                    <div className="mobile-separator"></div>
                    <div className="content-block">
                        <div className="home-features-block">
                            <h1 className="content-block-title block-title">
                                Control the Data
                            </h1>
                            <p className="content-block-text page-text">
                                Uncover results by filtering the year or term
                            </p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="grid-block">
                    <div className="content-block">
                        <div className="home-features-block">
                            <h1 className="content-block-title block-title">
                                Pass Rate
                            </h1>
                            <p className="content-block-text page-text">
                                Discover the passing percentage of your classes
                            </p>
                        </div>
                    </div>
                    <div className="mobile-separator"></div>
                    <div className="content-block">
                        <div className="home-features-block">
                            <h1 className="content-block-title block-title">
                                Student Count
                            </h1>
                            <p className="content-block-text page-text">
                                Examine how the number of students changes
                            </p>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title block-title">
                            Support
                        </h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">
                                If you have any questions, concerns, or
                                feedback, please let me know.
                            </p>
                        </div>
                        <NavLink
                            to={"/contact"}
                            className={"page-action page-text"}
                        >
                            Contact Me
                        </NavLink>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="content-block-inner">
                        <h1 className="content-block-title block-title">
                            Data Source
                        </h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">
                                All data was acquired from FOIA (Freedom of
                                Information Act) requests to the Oregon State
                                University Public Records Officer.
                            </p>
                            <p className="content-block-text page-text">
                                The data displayed on this website is publicly
                                available information and is intended for
                                informational purposes only. The website is not
                                affiliated with Oregon State University, and the
                                data may not reflect current grading policies or
                                practices.
                            </p>
                        </div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={PUBLIC_RECORDS_URL}
                            className="page-action page-text external-link"
                        >
                            Learn more{" "}
                            <img
                                src="/share-box-fill.svg"
                                alt="External link as arrow pointing out of box"
                                className="image-external-link"
                            ></img>
                        </a>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="content-block">
                    <div className="home-getstarted-block center-center">
                        <h1 className="content-block-title block-title">
                            Ready to go?
                        </h1>
                        <div className="content-block-text-container">
                            <p className="content-block-text page-text">
                                Find out today how other students performed in
                                your classes!
                            </p>
                        </div>
                        <NavLink
                            to={"/courses"}
                            className={"page-action page-text"}
                        >
                            Get started
                        </NavLink>
                    </div>
                </div>

                <div className="separator"></div>
            </div>
        </>
    );
}

export default AboutPage;
