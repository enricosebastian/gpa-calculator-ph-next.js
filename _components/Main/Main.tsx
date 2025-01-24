import { useCourseContext } from '@/_context/CourseContext';
import styles from './Main.module.scss';
import { useMainContext } from '@/_context/MainContext';
import { useTermContext } from '@/_context/TermContext';
import { ChangeEvent, useContext, useEffect } from "react";
import { ExcelSheet } from '@/_types/ExcelSheet';
import RetroButton from '../RetroButton/RetroButton';
import RetroInput from '../RetroInput/RetroInput';
import RetroTable from '../RetroTable/RetroTable';

export default function Main() {
    const {selectedCourses, selectedTermId, setSelectedTermId} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, deleteCourse} = useCourseContext();

    const selectedTerm = terms.find(term => term.id === selectedTermId);

    const handleTermNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const modified_term = {id: selectedTermId, name: e.target.value};

        modifyTerm(modified_term);
    };

    const handleClickImportButton = () => {
        document.getElementById('import_grades_button')?.click();
    }

    const handleExportData = async () => {
        ExcelSheet.export(terms, courses);
    }

    const handleFileUpload = async () => {
        const file_uploader = document.querySelector<HTMLInputElement>('#excel--file--uploader');
        if (file_uploader === null)
            return;

        if (file_uploader.files === null)
            return;

        if (file_uploader.files.length > 1)
            return;

        const file = file_uploader.files[0];
        const excel_sheet: ExcelSheet = new ExcelSheet();

        excel_sheet.initialize(file).then((data) => {
            const [new_terms, new_courses] = excel_sheet.getTermsAndCourses();

            courses.forEach(course => {
                deleteCourse(course);
            });

            terms.forEach(term => {
                deleteTerm(term);
            });

            new_terms.forEach(term => {
                addTerm(term);
            });

            new_courses.forEach(course => {
                addCourse(course);
            });

            if (new_terms.length > 0) {
                setSelectedTermId(new_terms[0].id);
            }
        }).catch((error) => {
            alert(error);
            return;
        })
    }

    return (
        <div className="retrotable--container">
            <div className="retrotable--content">
                <div className="retrotable--term--name--container">
                    <RetroInput value={selectedTerm?.name} type="text" onChange={e => handleTermNameChange(e)}></RetroInput>
                </div>
                <div className="retrotable--table--container">
                    <RetroTable/>
                </div>
                <div className="retrotable--footer--container">

                    <RetroButton onClick={handleExportData}>export grades</RetroButton> <RetroButton onClick={handleClickImportButton}>import grades</RetroButton>
                    
                    <input id='import_grades_button' className='hidden' type='file' accept='.xls,.xlsx' onChange={handleFileUpload}></input>
                </div>
            </div>
        </div>
    );
}