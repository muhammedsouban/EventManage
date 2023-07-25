import React from "react";
import Link from "next/link";
interface NavbarProps {
  // Define any props you may need
}

const Navbar: React.FC<NavbarProps> = () => {

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
       <h1 className="font-bold uppercase text-lg">Shedule</h1>
      </div>
      <div className="flex items-center">
      <Link href="/">
        <span className="mr-4">Events</span>
      </Link>
      <Link href="/Calender">
        <span >Calendar</span>  
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;
