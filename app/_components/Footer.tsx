import Link from "next/link";

export default function Footer() {
    return (
        <div  className="bg-green-500 flex flex-row">
            <div id="links" className="bg-pink-500 grow">
                <Link href="/about" className="bg-yellow-400">//about</Link>
                <Link href="/contact_us" className="bg-purple-400">//contact_us</Link>
                <Link href="/add_your_university" className="bg-orange-300">//add_your_university</Link>
            </div>
            <div id="copyright" className="bg-blue-400">@enricosebastian</div>
        </div>
    );
}