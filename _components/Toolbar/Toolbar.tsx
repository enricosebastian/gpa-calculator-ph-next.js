import { useTermContext } from "@/_context/TermContext";
import { Term } from "@/_types/Term"
import { ChangeEvent, useContext } from "react";
import { useMainContext } from "@/_context/MainContext";
import {v4 as uuid} from "uuid"; 

export default function Toolbar() {
    const {selectedTerm, setSelectedTerm} = useMainContext();
    const {terms, addTerm, modifyTerm} = useTermContext();

    const dropdown_values = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);

    const handleSelectOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const new_selected_term = terms.find(term => term.id === e.target.value);
        
        if (!new_selected_term) {
            throw new Error('Term does not exist!');
        }

        setSelectedTerm(new_selected_term);
    };

    const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        modifyTerm({...selectedTerm, name: e.target.value});
    };

    const handleAddNewTerm = () => {
        const new_term_id = uuid();

        const new_term: Term = {
            id: new_term_id,
            name: new_term_id
        };

        addTerm(new_term);
        setSelectedTerm(new_term);
    }
    
    return (
        <div>
            <select onChange={e => handleSelectOnChange(e)}>{dropdown_values}</select>
            <input value={selectedTerm.name} onChange={e => handleInputOnChange(e)}></input>
            <button onClick={handleAddNewTerm}>Add a term</button>
            <button>Delete this term</button>
            <button>Add a course</button>
        </div>
    );
}