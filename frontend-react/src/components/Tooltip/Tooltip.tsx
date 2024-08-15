import "./Tooltip.css";

function Tooltip({ message }) {

    return (
        <>
            <div className="tooltip-container">
                <div className="tooltip-wrapper">
                    i
                    <span className="tooltip-text tooltip-top">{message}</span>
                </div>
            </div>
        </>
    );
}

export default Tooltip;