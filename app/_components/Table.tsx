import DropdownMenuForTerms from "./_table_components/DropdownMenuForTerms";

export default function Table() {
    return (
        <table className="table-fixed">
          <thead>
            <DropdownMenuForTerms></DropdownMenuForTerms>
            <tr className="border-black border-solid border-[5px]">
              <td className="border-black border-solid border-[5px] w-40">course_code</td>
              <td className="border-black border-solid border-[5px] w-40">course_title</td>
              <td className="border-black border-solid border-[5px] w-40">grade</td>
              <td className="border-black border-solid border-[5px] w-40">unit</td>
            </tr>
          </thead>

          <tbody>
            <tr className="border-black border-solid border-[5px]">
              <td className="border-black border-solid border-[5px]">
                <input></input>
              </td>
              <td className="border-black border-solid border-[5px]">
                <input></input>
              </td>
              <td className="border-black border-solid border-[5px]">
                <input></input>
              </td>
              <td className="border-black border-solid border-[5px]">
                <input></input>
              </td>
            </tr>
          </tbody>
        </table>
    );
}