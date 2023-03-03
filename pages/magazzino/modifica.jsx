import { useEffect, useState } from "react";

//components

import { FetchData, DeleteData, UpdateData } from "../../components/database";
import Notification from "../../components/Notification";
import HeaderMenu from "../../components/HeaderMenu";
import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import TableRowInput from "../../components/TableRowInput";

const SetWarehouse = () => {
  const database = "scorte";
  const [newItemName, setNewItemName] = useState("");
  const [newQuantity, setQuantity] = useState(null);
  const [items, setItems] = useState([]);
  const [messageForUser, setMessageForUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editItemIndex, setIndex] = useState(null);
  const [orderBy, setOrder] = useState("name");

  const refreshPage = () => {
    FetchData(database, setItems, orderBy);
  };

  useEffect(() => {
    FetchData(database, setItems, orderBy);
  }, [orderBy]);

  const handleDelete = async () => {
    await DeleteData("scorte", "id", items[editItemIndex].id);
    setEdit(false);
    refreshPage();
  };

  const handleSubmit = async () => {
    let sliceName = newItemName.slice(1).toLowerCase();
    let firstLetter = newItemName.charAt(0).toUpperCase();
    let finalName = `${firstLetter}${sliceName}`;

    if (!newItemName || !newQuantity) {
      setMessageForUser(["Per continuare", "compila prima i campi vuoti"]);
      console.log(messageForUser);
      return;
    }

    await UpdateData(
      "scorte",
      "name",
      finalName,
      "quantity",
      newQuantity,
      items[editItemIndex].id
    );

    setEdit(false);
    refreshPage();
  };
  return (
    <div className=" relative w-screen h-screen bg-gray-100  ">
      <HeaderMenu database={database} />
      {messageForUser && (
        <Notification
          messageForUser={messageForUser}
          setMessageForUser={setMessageForUser}
        />
      )}
      <div className="justify-center flex bg-gray-100">
        <div className="table  w-screen lg:w-full lg:max-w-6xl  ">
          <TableHeader setOrder={setOrder} />
          {edit === true && (
            <TableRowInput
              handleDelete={handleDelete}
              handleSubmit={handleSubmit}
              setQuantity={setQuantity}
              setEdit={setEdit}
              setNewItemName={setNewItemName}
              newItemName={newItemName}
              newQuantity={newQuantity}
            />
          )}
          <div className="table-row-group ">
            {items &&
              items.map((item, index) => {
                const { id, name, quantity, date } = item;
                return (
                  <TableRow
                    key={id}
                    id={id}
                    name={name}
                    quantity={quantity}
                    setNewItemName={setNewItemName}
                    date={date}
                    setEdit={setEdit}
                    setIndex={setIndex}
                    setQuantity={setQuantity}
                    index={index}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetWarehouse;
