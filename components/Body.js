import React, { useEffect, useState } from "react";
import Table from "./Table";
import styles from "@/styles/Body.module.scss";


export default function Body() {

    const [courses, setCourses] = useState([
        {code: "CCAPDEV", title: "Web applications", grade: 0.0, units: 0.0}, 
        {code: "MOBDEVE", title: "Mobile development", grade: 0.0, units: 0.0},
        {code: "CCINFOM", title: "Database management", grade: 0.0, units: 0.0},
    ]);

    const changeCourseCode = (originalCourseCode, newCourseCode) => {
        setCourses(prevState => {
            const courseIndex = prevState.findIndex(course => course.code === originalCourseCode);
            return prevState.map((course, index) => {
                if(courseIndex === index) {
                    // do something else
                    return {...course, code: newCourseCode};
                } else {
                    return course;
                }
            });
        });
    }

    return (
        <div className={styles.body__wrapper__full}>
            <Table courses={courses} changeCourseCode={changeCourseCode}/>
        </div>
    );
}