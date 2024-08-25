import "./BackToTop.css";

function BackToTop() {

    function topFunction() {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    return (
        <>
            <div className="toTop-wrapper">
                <button className="toTop-component" onClick={topFunction} >Back to Top</button>
            </div>
        </>
    );
}

export default BackToTop;