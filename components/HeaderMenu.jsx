import Link from "next/link";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HomeIcon from "@mui/icons-material/Home";

const HeaderMenu = (props) => {
  const { database } = props;
  return (
    <div
      className={
        (database === "scorte" && "flex justify-center items-center") ||
        "hidden sm:flex justify-center items-center "
      }
    >
      <Link href="/" className="text-lg p-4  font-semibold text-orange-700/75">
        <div
          className={
            (database === "scorte" &&
              "flex text-gray-400 hover:border-b-2 hover:text-orange-700/75 hover:border-orange-700/75") ||
            "flex border-b-2 border-orange-700/75"
          }
        >
          <ShoppingBasketIcon />
          <p> Lista spesa</p>
        </div>
      </Link>

      <Link href="/magazzino/modifica" className="text-lg p-4 font-semibold ">
        <div
          className={
            (database === "scorte" &&
              "flex text-orange-700/75 border-b-2 border-orange-700/75") ||
            "flex hover:text-orange-700/75 text-gray-400 hover:border-b-2 hover:border-orange-700/75"
          }
        >
          <HomeIcon />
          <p>Scorte</p>
        </div>
      </Link>
    </div>
  );
};

export default HeaderMenu;
