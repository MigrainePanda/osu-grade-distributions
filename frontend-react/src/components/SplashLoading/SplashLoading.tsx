import { useEffect } from "react";
import { useContext } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";

import "./SplashLoading.css";

function SplashLoading() {
    const { setIsSplash } = useContext(AllInfoContext);

    function disableScroll() {
        window.onscroll = function () {
            window.scrollTo(0, 0);
        }
    }
    disableScroll();

    function enableScroll() {
        window.onscroll = function () { };
    }

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('splash')?.classList.add('fade');
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
                <img src="/favicon.png" className="splash-logo"></img>
                <div className="splash-copyright-container">
                    <p className="copyright splash-copyright">&copy; 2024 Nicholas Tanaka</p>
                </div>
            </div>
        </>
    );
}

export default SplashLoading;