import {
  SearchIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useState } from "react";
import { useBag } from "../contexts/bag";

export default function Topbar() {
  const [searchOpened, setSearchOpened] = useState(false);
  const { items } = useBag();
  const itemsCount = items.length;

  if (searchOpened) {
    return (
      <div className=" border py-3 ">
        <div className="max-w-screen-lg m-auto flex justify-center items-center">
          <span>
            <SearchIcon className="w-6 h-6 " />
          </span>
          <input
            className="w-full h-10 outline-none px-4 py-2"
            placeholder="Search ...."
          />
          <button
            onClick={() => setSearchOpened(false)}
            className="text-gray-700 outline-none"
          >
            <XIcon className="w-6 h-6 " />
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="border py-5 ">
      <div className="flex justify-between max-w-screen-xl m-auto items-center">
        <Link href="/">
          <div className="block font-bold border-b-2 border-black cursor-pointer">
            REMOTE DEMO
          </div>
        </Link>

        <nav className="flex items-center">
          <NavItem text="LATEST" />
          <NavItem text="FASHION" />
          <NavItem text="MEN" />
          <NavItem text="WOMEN" />
        </nav>
        <div className="flex items-center">
          <NavItem text="SHOP" />
          <span
            className="ml-3 cursor-pointer"
            onClick={() => setSearchOpened(true)}
          >
            <SearchIcon className="w-6 h-6 " />
          </span>
          <span className="ml-3 cursor-pointer">
            <UserCircleIcon className="w-6 h-6 " />
          </span>
          <span className="ml-3 cursor-pointer relative">
            <Link href="/shop/cart">
              <div>
                <ShoppingBagIcon className="w-6 h-6 z-40" />
                {itemsCount > 0 && (
                  <span className="absolute text-xs  text-red-500 top-2 left-2">
                    {itemsCount}
                  </span>
                )}
              </div>
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
}

const NavItem = ({ text, href }: any) => (
  <Link href={href || "#"}>
    <span className="text-sm ml-3 font-bold color-gray-900 cursor-pointer">
      {text}
    </span>
  </Link>
);
