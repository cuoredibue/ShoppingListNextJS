import { useEffect, useState } from "react";
import { AddData, FetchData } from "./database";
import MyDropdown from "./MenuInputBar";
import HeaderMenu from "./HeaderMenu";

const InputBar = (props) => {
  const {
    setNewItemName,
    newItemName,
    database,
    refresh,
    setMessage,
    messageForUser,
    inputError,
    setInputError,
  } = props;

  const [orderBy, setOrder] = useState("name");
  const databaseScorte = "scorte";
  const [scorte, setScorte] = useState(null);

  useEffect(() => {
    FetchData(databaseScorte, setScorte, orderBy);
  }, []);

  ///////////////////////// add new item in the list//////////////////////////////////
  const handleSubmit = async (e) => {
    let sliceName = newItemName.slice(1).toLowerCase();
    let firstLetter = newItemName.charAt(0).toUpperCase();
    let finalName = `${firstLetter}${sliceName}`;

    if (!newItemName) {
      setInputError("devi inserire del testo ");
      return;
    }
    let doppione = scorte.filter((item) => {
      return item.name === finalName;
    });

    if (doppione.length >= 1) {
      setMessage([
        `Ricorda che hai già ${doppione[0].name}`,
        "controlla in magazzino!",
      ]);
    }
    if (doppione.length === 0) {
      setMessage(null);
    }
    await AddData(database, finalName, 1);
    setNewItemName("");
    refresh();
  };

  return (
    <div className=" bg-gray-100 dark:bg-slate-800 sticky  w-screen  top-0 sm:mb-6  z-20 p-2">
      <HeaderMenu />
      <div className="flex h-8 mb-2 sm:mb-1 rounded-full bg-orange-200 dark:bg-teal-500">
        <div className="flex-none">
          <MyDropdown inputError={inputError} />
        </div>

        <div className="grow flex">
          <input
            placeholder={(inputError && inputError) || "aggiungi"}
            className={
              (inputError &&
                "input none h-full  w-full  bg-red-400 placeholder-red-900 rounded-l-none sm:rounded-l-full focus:outline-none rounded-r-none") ||
              "input none h-full  placeholder-white w-full max-w-8xl bg-orange-200  dark:bg-teal-500 dark:text-white rounded-l-full focus:outline-none rounded-r-none text-gray-900"
            }
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            onChange={(e) => {
              setNewItemName(e.target.value);
              setInputError(null);
            }}
            value={newItemName}
          />
          <input
            value="+"
            type="button"
            className="btn-xs text-lg text-gray-100 hover:bg-teal-600  dark:bg-teal-800 bg-teal-500 rounded-r-full w-12 border-none h-full"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default InputBar;
