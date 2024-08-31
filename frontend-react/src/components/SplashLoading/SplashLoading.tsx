import { useEffect } from "react";
import { useContext } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";

import "./SplashLoading.css";

function SplashLoading() {
    const { setIsSplash } = useContext(AllInfoContext);

    function disableScroll() {
        document.body.classList.add('no-scroll');
    }

    function enableScroll() {
        document.body.classList.remove('no-scroll');
    }

    useEffect(() => {
        disableScroll();
        document.getElementById('content')?.classList.add('hidden');
        setTimeout(() => {
            document.getElementById('splash')?.classList.add('fade');
            document.getElementById('content')?.classList.remove('hidden');
            setTimeout(() => {
                enableScroll();
                document.getElementById('splash')?.classList.add('fade-done');
                setIsSplash(true);
            }, 1000);
        }, 1000);
    }, [setIsSplash]);

    return (
        <>
            <div id="splash">
                <img src="/favicon.webp" className="splash-logo"></img>
                <div className="splash-copyright-container">
                    <p className="copyright splash-copyright">&copy; 2024 Nicholas Tanaka</p>
                </div>
            </div>
        </>
    );
}

export default SplashLoading;