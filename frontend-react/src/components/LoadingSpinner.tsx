import ReactLoading from "react-loading";

function LoadingSpinner() {

    return (
        <>
            <div className="center-div">
                <ReactLoading type={"spinningBubbles"} color={"#000000"} height={50} width={50} />
            </div>
        </>
    );
}

export default LoadingSpinner;