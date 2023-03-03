import { Menu } from "@headlessui/react";
import Link from "next/link";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HomeIcon from "@mui/icons-material/Home";

function MyDropdown(props) {
  const { inputError } = props;
  return (
    <Menu>
      <Menu.Button
        className={
          (inputError &&
            "bg-red-400 sm:hidden flex justify-center h-8 w-10 rounded-l-full  text-orange-700/75 group") ||
          "bg-orange-200 flex justify-center sm:hidden h-8 w-10 rounded-full text-orange-700/75 group"
        }
      >
        <svg
          width="25"
          height="25"
          viewBox="0 -2 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H12.5C12.7761 5 13 4.77614 13 4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Menu.Button>
      <Menu.Items className="bg-gray-100  animate-[enterFromTop_200ms] absolute">
        <Menu.Item>
          <div className="p-5 w-screen  sm:w-96 text-center flex  flex-row ">
            <Link
              className="border-2 border-gray-100 hover:border-b-orange-700/75 border-b-orange-700/75 basis-1/2  rounded p-1 "
              href="/"
            >
              <ShoppingBasketIcon className="text-orange-700/75" />
              <p className="  text-slate-600">Lista spesa</p>
            </Link>
            <Link
              className=" border-2 border-gray-100 hover:border-b-orange-700/75 basis-1/2 rounded p-1 "
              href="/magazzino/modifica"
            >
              <HomeIcon />
              <p className="text-slate-400 ">Scorte</p>
            </Link>
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default MyDropdown;
