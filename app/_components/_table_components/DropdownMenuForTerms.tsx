"use client";

import Term from "@/app/_models/Term";


interface Props {
    terms: Term[];
    onDropdownChange: Function;
}

export default function DropdownMenuForTerms({terms, onDropdownChange}: Props) {
    const options = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);
    
    return (
        <tr className="">
            <td className="border-black border-solid border-[5px] flex-col">
            <div className="flex">
                <select name="term" className="grow pl-1">
                    {options}
                </select>
                <div className="px-2"><button>x</button></div>
            </div>
            </td>
        </tr>
    );
}