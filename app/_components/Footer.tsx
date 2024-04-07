import Link from "next/link";

export default function Footer() {
    return (
        <div  className="flex flex-row px-3">
            <div id="links" className="grow">
                <Link href="/about" className="mr-5 hover:font-bold">
                    //about
                </Link>
                <Link href="/contact_us" className="mr-5 hover:font-bold">
                    //contact_us
                </Link>
                <Link href="/add_your_university" className="hover:font-bold">
                    //add_your_university
                </Link>
            </div>
            
            <div id="copyright" className="">
                <span>
                    by <Link href="https://github.com/enricosebastian" className="hover:font-bold">@enricosebastian</Link>
                </span>
            </div>
        </div>
    );
}