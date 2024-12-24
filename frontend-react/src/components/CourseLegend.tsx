import { useEffect, useState } from "react";

function CourseDescription() {
    const [text, setText] = useState("");

    useEffect(() => {
        const getSeason = (d) => Math.floor((d.getMonth() / 12) * 4 - 1) % 4;
        const date = new Date();
        const season = ["S", "Su", "F", "W"][getSeason(date)];
        setText(`Last Term: ${season}, ${date.getFullYear()}`);
    }, []);

    return (
        <>
            <div className="content-block">
                <div className="content-block-inner">
                    <h1 className="content-block-title">Legend</h1>
                    <div className="grid-block">
                        <ul className="page-text">
                            <li className="content-block-text">F: Fall</li>
                            <li className="content-block-text">W: Winter</li>
                            <li className="content-block-text">S: Spring</li>
                            <li className="content-block-text">Su: Summer</li>
                        </ul>
                        <ul className="page-text">
                            <li className="content-block-text">{text}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseDescription;
