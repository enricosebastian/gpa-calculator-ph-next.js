import starting_terms from './TermSeeder'

const gerphis: Course = {
    id: '0',
    name: 'History of PH',
    code: 'GERPHIS',
    unit: '3.0',
    grade: '4.0',
    term: starting_terms[0],
}

const ccprog1: Course = {
    id: '1',
    name: 'Computer Programming 1',
    code: 'CCPROG1',
    unit: '3.0',
    grade: '4.0',
    term: starting_terms[0],
}

const ccprog2: Course = {
    id: '2',
    name: 'Computer Programming 2',
    code: 'CCPROG2',
    unit: '3.0',
    grade: '4.0',
    term: starting_terms[1],
}

const ccprog3: Course = {
    id: '3',
    name: 'Computer Programming 3',
    code: 'CCPROG3',
    unit: '3.0',
    grade: '4.0',
    term: starting_terms[2],
}

const geartap: Course = {
    id: '4',
    name: 'Art Appreciation',
    code: 'GEARTAP',
    unit: '3.0',
    grade: '4.0',
    term: starting_terms[2],
}

const starting_courses: Course[] = [gerphis, ccprog1, ccprog2, ccprog3, geartap];

export default starting_courses;