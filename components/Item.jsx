import { DeleteData, UpdateData } from "../components/database";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { Popover } from "@headlessui/react";
const Item = (props) => {
  const {
    name,
    id,
    quantity,
    index,
    checked,
    value,
    database,
    refresh,
    setMessage,
    items,
  } = props;

  const handleIncrease = async () => {
    await UpdateData(database, "quantity", quantity + 1, "name", name, id);
    setMessage(null);
    refresh();
  };

  const handleReduce = async () => {
    await UpdateData(database, "quantity", quantity - 1, "name", name, id);
    setMessage(null);
    refresh();
  };

  const handleDelete = async () => {
    await DeleteData(database, "id", id);
    setMessage(null);
    refresh();
  };

  const handleCheckbox = async (e) => {
    let checkedItem = items.filter((item) => {
      return item.id == e.target.value;
    });

    await UpdateData(
      database,
      "checked",
      !checkedItem[0].checked,
      "quantity",
      quantity,
      e.target.value
    );
    setMessage(null);
    refresh();
  };

  return (
    <Popover>
      <div className="flex h-8 items-center  bg-gray-100 space-x-5  ">
        <div className="">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckbox}
            className="checkbox rounded-full mt-1 checkbox-sm ml-4 sm:ml-0 checkbox-accent"
            value={value}
          />
        </div>
        <Popover.Button className="flex focus:outline-none space-x-3 text-lg">
          {quantity > 1 && (
            <h2 className="text-gray-500 text-xs mt-2">x{quantity}</h2>
          )}
          <h2
            onClick={() => {
              setMessage(null);
            }}
            className="text-gray-800 hover:underline mb-1 "
          >
            {name}
          </h2>
        </Popover.Button>
        <Popover.Panel>
          <div
            className={
              "flex animate-[enterFromLeft_300ms] space-x-2 rounded text-slate-300"
            }
          >
            <button
              className="flex items-center justify-center h-5 w-5 text-teal-900 hover:scale-125 rounded-full bg-teal-500"
              onClick={() => {
                handleIncrease(id, index);
              }}
            >
              <AddIcon />
            </button>
            <button
              className="flex items-center justify-center h-5 w-5 text-yellow-900 hover:scale-125 rounded-full bg-yellow-400"
              onClick={() => {
                handleReduce(id, index);
              }}
            >
              <RemoveIcon />
            </button>
            <button
              className="flex items-center justify-center h-5 w-5 text-red-900 hover:scale-125 rounded-full bg-red-400"
              onClick={() => {
                handleDelete(id, index);
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </button>
          </div>
        </Popover.Panel>
      </div>
    </Popover>
  );
};

export default Item;
