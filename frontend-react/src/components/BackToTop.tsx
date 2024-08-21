

function BackToTop() {

    function topFunction() {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    return (
        <>
            <div className="button-wrapper">
                <button className="button-component" onClick={topFunction} >Back to Top</button>
            </div>
        </>
    );
}

export default BackToTop;