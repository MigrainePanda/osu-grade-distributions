import { useEffect, useContext } from "react";
import { AllInfoContext } from "../components/contexts/AllInfoContext.tsx";

import "./css/home-page.css";

const URL = window.location.href;

function HomePage() {

    const { isUpdated, setIsUpdated } = useContext(AllInfoContext);

    useEffect(() => {
        const checkRefreshDB = async () => {
            const response = await fetch(URL + 'refresh');
            const checkRefresh = await response.json();
            console.log("refresh: ", checkRefresh);
            setIsUpdated(true);
        }

        if (!isUpdated) {
            checkRefreshDB();
        }
    }, [isUpdated, setIsUpdated]);

    return (
        <>
            <div className="home-container">
                <div className="home-content">
                    <div className="home-title center-text">
                        <h1 className="course-title">Oregon State University</h1>
                        <h2>Grade Distributions</h2>
                    </div>
                    <div className="home-description center-text">
                        <p>Find out how other students performed in your classes!</p>
                        <p>Export your data to quickly access it later!</p>
                    </div>
                    <p className="chevron">v</p>
                </div>
            </div>
        </>
    )
}

export default HomePage;