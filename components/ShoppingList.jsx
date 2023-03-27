import { useEffect, useState } from "react";

//components
import InputBar from "../components/InputBar";
import { FetchData } from "../components/database";
import Item from "../components/Item";
import BottomBar from "../components/BottomBar";
import WelcomeMessage from "../components/WelcomeMessage";
import Notification from "../components/Notification";

const ShoppingList = () => {
  const database = "lista_spesa";
  const [newItemName, setNewItemName] = useState("");
  const [items, setItems] = useState(["item"]);
  const [messageForUser, setMessageForUser] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [orderBy, setOrder] = useState("name");

  const refreshPage = () => {
    FetchData(database, setItems, orderBy);
  };

  useEffect(() => {
    FetchData(database, setItems, orderBy);
  }, []);

  return (
    <div className=" relative w-screen h-screen dark:bg-slate-800 bg-gray-100  ">
      <InputBar
        setNewItemName={setNewItemName}
        newItemName={newItemName}
        database={database}
        refresh={refreshPage}
        setMessage={setMessageForUser}
        messageForUser={messageForUser}
        inputError={inputError}
        setInputError={setInputError}
      />
      {messageForUser && (
        <Notification
          messageForUser={messageForUser}
          setMessageForUser={setMessageForUser}
        />
      )}

      <div className="sm:flex bg-gray-100 dark:bg-slate-800 sm:justify-center ">
        <div className="sm:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 sm:gap-x-24 sm:gap-y-2 sm:grid-cols-2 ">
          {items &&
            items.map((item, index) => {
              const { id, name, quantity, checked } = item;
              return (
                <div key={id + 1}>
                  <Item
                    name={name}
                    id={id}
                    quantity={quantity}
                    index={index}
                    checked={checked}
                    value={id}
                    database={database}
                    refresh={refreshPage}
                    setMessage={setMessageForUser}
                    items={items}
                  />
                </div>
              );
            })}
        </div>
      </div>

      {(items.length > 0 && (
        <BottomBar
          database={database}
          refresh={refreshPage}
          items={items}
          setMessage={setMessageForUser}
          messageForUser={messageForUser}
        />
      )) || <WelcomeMessage />}
    </div>
  );
};

export default ShoppingList;
