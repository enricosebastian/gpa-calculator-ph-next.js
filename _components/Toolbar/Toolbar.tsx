import { TermContext, useTermContext } from "@/_context/TermContext";
import { Course } from "@/_types/Course";
import { Term } from "@/_types/Term"
import { ChangeEvent, useContext } from "react";
import { MainContext } from "../Main";

interface ToolbarProps {
    selected_term: Term,
}

export default function Toolbar(props: ToolbarProps) {
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const dropdown_values = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);
    const {selected_term, handleSelectTerm} = useContext(MainContext);

    const handleSelectOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        handleSelectTerm(e.target.value);
    };

    const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        modifyTerm({...selected_term, name: e.target.value});
    };

    const handleAddNewTerm = () => {
        const new_term_id = crypto.randomUUID();
        addTerm({id: new_term_id, name: ''});
        console.log(new_term_id);
        console.log(terms);
        handleSelectTerm(new_term_id);
    }
    
    return (
        <div>
            <select onChange={e => handleSelectOnChange(e)}>{dropdown_values}</select>
            <input value={selected_term.name} onChange={e => handleInputOnChange(e)}></input>
            <button onClick={handleAddNewTerm}>Add a term</button>
            <button>Delete this term</button>
            <button>Add a course</button>
        </div>
    );
}