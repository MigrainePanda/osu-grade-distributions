import { useEffect } from "react";

function HomePage() {

    const checkRefreshDB = async () => {
        const response = await fetch("http://localhost:8800/");
        const checkRefresh = await response.json();
        console.log("refresh: ", checkRefresh)
    }

    useEffect(() => {
        checkRefreshDB();
    }, []);

    return (
        <>
            <div className="center-text">
                <h1>Oregon State University</h1>
                <h2>Grade Distributions</h2>
                <p>-</p>
                <p>Find out how other students performed in your classes!</p>
                <p>Export your data to quickly access it later!</p>
            </div>
        </>
    )
}

export default HomePage;