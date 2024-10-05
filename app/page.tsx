import Player from "@/components/Player";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <h1>Music App</h1>
      {/* navigation menu here */}
      <div className="w-full h-12 my-4">
        <ul className="flex gap-4">
          <li className="font-bold border-2 p-2">
            <Link href="/">Home</Link>
          </li>
          <li className="font-bold border-2 p-2">
            <Link href="/about">About</Link>
          </li>
          <li className="font-bold border-2 p-2">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <Player />
    </React.Fragment>
  );
}
