import "./css/home-page.css";

function HomePage() {
    
    document.title = 'Grade Distributions | Home';

    return (
        <>
            <div className="home-container">
                <div className="home-content">
                    <div className="home-title-container center-text">
                        <h1 className="home-title">Oregon State University</h1>
                        <h2 className="home-subtitle">Grade Distributions</h2>
                    </div>
                    <div className="home-description center-text">
                        <p>Find out how other students performed in your classes!</p>
                    </div>
                    <img src="/chevron.svg" alt="Chevron pointing down" className="chevron" />
                </div>
            </div>
        </>
    )
}

export default HomePage;