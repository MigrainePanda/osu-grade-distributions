

function BackToTop() {

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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