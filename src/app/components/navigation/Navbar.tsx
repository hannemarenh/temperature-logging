import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="w-full fixed top-0 mx-auto">
            <ul className="flex justify-center flex-row gap-x-6 py-4 h-full">
                <li>
                    <Link href="/add">
                        <p>Add</p>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <p>Home</p>
                    </Link>
                </li>
                <li>
                    <Link href="/graph">
                        <p>Graph</p>
                    </Link>
                </li>
            </ul>
        </div>)
}

export default Navbar;

