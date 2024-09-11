import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav>
        <Link href="/dashboard" className="text-xl font-bold">
          Composera
        </Link>
        {/* Add other navigation items here if needed */}
      </nav>
    </header>
  );
};

export default Header;
