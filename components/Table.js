import React from "react";
import styles from "@/styles/Table.module.scss";

export default function Table({term, setTerm}) {

    console.log(term);

    const courseData = term.courses.map(course => 
        <tr key={course.courseCode}>
            <td>{course.courseCode}</td>
            <td>{course.title}</td>
            <td>{course.grade}</td>
            <td>{course.units}</td>
        </tr>
    );

    const changeCourseCode = () => {
        setTerm(prevState.map(prevState => prevState));
    }

    return (
        <table className={styles.table__table__wrapper}>
            <thead>
               <tr>
                    <th onClick={changeCourseCode}>Course code</th>
                    <th>Course title</th>
                    <th>Grade</th>
                    <th>Units</th>
                </tr> 
            </thead>
            <tbody>
                {(courseData.length > 0) ?
                    courseData :
                    <tr>
                        <td>COURSE CODE</td>
                        <td>Course title here</td>
                        <td>0.0</td>
                        <td>0.0</td>
                    </tr> 
                }
                
            </tbody>
        </table> 
    );
}