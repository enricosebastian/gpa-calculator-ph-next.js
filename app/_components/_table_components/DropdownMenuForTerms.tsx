export default function DropdownMenuForTerms() {
    return (
        <tr className="">
            <td className="border-black border-solid border-[5px] flex-col">
            <div className="flex">
                <select name="term" className="grow pl-1">
                    <option value="term_1">term 1</option>
                    <option value="term_2">term 2</option>
                    <option value="term_3">term 3</option>
                    <option value="term_4">term 4</option>
                    <option value="term_5">term 5</option>
                    <option value="term_6">term 6</option>
                    <option value="term_7">term 7</option>
                    <option value="term_8">term 8</option>
                    <option value="term_9">term 9</option>
                    <option value="term_10">term 10</option>
                    <option value="term_11">term 11</option>
                    <option value="term_12">term 12</option>
                </select>
                <div className="px-2"><button>x</button></div>
            </div>
            </td>
        </tr>
    );
}