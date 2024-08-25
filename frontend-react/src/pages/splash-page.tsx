import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./css/splash-page.css";

function SplashPage() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('splash')?.classList.add('fade');
            setTimeout(() => {
                navigate('/');
            }, 1000)
        }, 1000);
    }, [navigate]);

    return (
        <>
            <div id="splash">
                <h1>Oregon State University</h1>
                <h2>Grade Distributions</h2>
            </div>

            <div className="white-screen"></div>
        </>
    );
}

export default SplashPage;