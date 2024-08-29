import { useEffect } from "react";
import { useContext } from "react";
import { AllInfoContext } from "../contexts/AllInfoContext.tsx";

import "./SplashLoading.css";

function SplashLoading() {
    const { setIsSplash } = useContext(AllInfoContext);

    function disableScroll() {
        console.log('scroll disabled');
        window.onscroll = function () {
            window.scrollTo(0, 0);
        }
        document.body.classList.add('no-scroll');
    }

    function enableScroll() {
        console.log('scroll enabled');
        window.onscroll = function () { };
        document.body.classList.remove('no-scroll');
    }

    useEffect(() => {
        disableScroll();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('splash')?.classList.add('fade');
            setTimeout(() => {
                document.getElementById('splash')?.classList.add('fade-done');
                enableScroll();
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