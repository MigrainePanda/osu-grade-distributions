import "./css/home-page.css";

function HomePage() {

    return (
        <>
            <div className="home-container">
                <div className="home-content">
                    <div className="home-title center-text">
                        <h1 className="course-title">Oregon State University</h1>
                        <h2 className="course-subtitle">Grade Distributions</h2>
                    </div>
                    <div className="home-description center-text">
                        <p>Find out how other students performed in your classes!</p>
                    </div>
                    <p className="chevron">v</p>
                </div>
            </div>
        </>
    )
}

export default HomePage;