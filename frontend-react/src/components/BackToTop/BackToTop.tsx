import { useEffect, useRef } from "react";
import "./BackToTop.css";

function BackToTop() {

    const containerRef = useRef<HTMLDivElement>(null);

    function topFunction() {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    function showButton() {
        if (window.scrollY > 0) {
            containerRef.current?.classList.add('show-top-button');
        } 
        else {
            containerRef.current?.classList.remove('show-top-button');
        }
    }

    useEffect(() => {
        window.onscroll = function() {showButton()};
    })

    return (
        <>
            <div className="toTop-container" ref={containerRef} onClick={topFunction}>
                <img src="/arrow-up-circle-line.svg" alt="Jump to top button" className="toTop-img" />
            </div>
        </>
    );
}

export default BackToTop;