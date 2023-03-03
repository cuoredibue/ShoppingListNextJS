import { useEffect, useState } from "react";

//components

import { FetchData, DeleteData, UpdateData } from "../../components/database";
import Notification from "../../components/Notification";
import HeaderMenu from "../../components/HeaderMenu";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const SetWarehouse = () => {
  const database = "scorte";
  const [newItemName, setNewItemName] = useState("");
  const [newQuantity, setQuantity] = useState(null);
  const [items, setItems] = useState([]);
  const [messageForUser, setMessageForUser] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
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
      {items.length > 0 && (
        <div className="justify-center flex bg-gray-100">
          <div className="table  w-screen lg:w-full lg:max-w-6xl  ">
            <div className="table-header-group">
              <div className="table-row text-gray-600 text-sm font-semibold ">
                <div
                  onClick={() => {
                    setOrder("name");
                  }}
                  className="table-cell text-left "
                >
                  Nome
                </div>
                <div
                  onClick={() => {
                    setOrder("quantity");
                  }}
                  className="table-cell"
                >
                  N
                </div>
                <div
                  onClick={() => {
                    setOrder("date");
                  }}
                  className="table-cell text-center"
                >
                  Data
                </div>
              </div>
            </div>
            {edit === true && (
              <div className="animate-[enterFromRight_300ms] table-row bg-yellow-200 text-gray-600  ">
                <div className="table-cell py-2 border-t ">
                  <input
                    className=" bg-yellow-100 rounded  w-32 text-sm focus:bg-yellow-300 focus:outline-none"
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    onChange={(e) => {
                      setNewItemName(e.target.value);
                    }}
                    value={newItemName}
                  />
                </div>
                <div className="table-cell border-t">
                  <input
                    className=" bg-yellow-100 rounded w-8 text-sm focus:bg-yellow-300 focus:outline-none"
                    type="number"
                    value={newQuantity}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
                <div className="table-cell border-t text-center">
                  <button
                    className="hover:scale-125 text-teal-500"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    <CheckIcon />
                  </button>
                  <button
                    className="hover:scale-125 ml-2 text-red-600"
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
                <div className="table-cell border-t lg:text-right text-center">
                  <button
                    className="text-gray-400 text-sm hover:text-gray-500"
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    annulla
                  </button>
                </div>
              </div>
            )}
            <div className="table-row-group ">
              {items &&
                items.map((item, index) => {
                  const { id, name, quantity, date } = item;
                  return (
                    <div key={id} className=" table-row">
                      <div className="table-cell text-sm text-gray-600 py-2 border-t">
                        {name}
                      </div>
                      <div className="table-cell  text-sm py-2 border-t">
                        {`x${quantity}`}
                      </div>
                      <div className="table-cell py-2 border-t text-sm  text-center">
                        {date.substring(5, 10)}
                      </div>
                      <div
                        onClick={(e) => {
                          setIndex(index);
                          setNewItemName(name);
                          setQuantity(quantity);
                          setEdit(true);
                        }}
                        className="table-cell  py-2 border-t text-purple-500 text-center lg:text-right  text-sm"
                      >
                        <ModeEditIcon className=" hover:text-purple-700" />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetWarehouse;
