import PropTypes from "prop-types";

import CourseLegend from "../CourseLegend.tsx";
import PlotGrades from "./PlotGrades";
import PlotAvgPassRate from "./PlotAvgPassRate.tsx";
import PlotAvgWithdrawRate from "./PlotAvgWithdrawRate.tsx";
import PlotAvgGPA from "./PlotAvgGPA.tsx";
import PlotNumStudents from "./PlotNumStudents";

const PlotController = ({ coursesArr }) => {
    return (
        <>
            <div className="image-container grade-distribution-container">
                <PlotGrades courses={coursesArr} />
            </div>

            <div className="separator"></div>

            <CourseLegend />

            <div className="separator"></div>

            <div className="image-container">
                <PlotAvgGPA courses={coursesArr} />
            </div>

            <div className="separator"></div>

            <div className="image-container">
                <PlotAvgPassRate courses={coursesArr} />
            </div>

            <div className="separator"></div>

            <div className="image-container">
                <PlotAvgWithdrawRate courses={coursesArr} />
            </div>

            <div className="separator"></div>

            <div className="image-container">
                <PlotNumStudents courses={coursesArr} />
            </div>
        </>
    );
};

PlotController.propTypes = {
    coursesArr: PropTypes.array,
};

export default PlotController;
