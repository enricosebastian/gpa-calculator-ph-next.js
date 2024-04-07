import Link from "next/link";

export default function Header() {
    return (
        <div className="md:h-1/5 md:p-0 py-5 flex justify-center items-center">
            <div className="md:p-8 p-2 text-4xl border-solid border-black border-4 text-center">
                <Link href="/">DLSU GPA CALCULATOR</Link>
                <div className="md:hidden block text-base">by enricosebastian</div>
            </div>
        </div>
    );
}