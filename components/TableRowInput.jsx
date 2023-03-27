import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
const TableRowInput = (props) => {
  const {
    handleDelete,
    handleSubmit,
    setQuantity,
    setEdit,
    setNewItemName,
    newItemName,
    newQuantity,
  } = props;
  return (
    <div className="animate-[enterFromLeft_300ms] sticky top-5 table-row dark:bg-teal-500 bg-yellow-200 dark:text-white text-gray-600  ">
      <div className="table-cell pl-2 py-2 border-t ">
        <input
          autoFocus
          className="dark:bg-teal-500 bg-yellow-100 rounded  w-32 text-sm dark:focus:bg-teal-700 focus:bg-yellow-300 focus:outline-none "
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
          className=" bg-yellow-100 dark:bg-teal-500 dark:focus:bg-teal-700 rounded w-8 text-sm focus:bg-yellow-300 focus:outline-none"
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
          className="hover:scale-125 dark:text-teal-800 text-teal-500"
          onClick={() => {
            handleSubmit();
          }}
        >
          <CheckIcon />
        </button>
        <button
          className="hover:scale-125 ml-2 dark:text-white text-red-600"
          onClick={() => {
            handleDelete();
          }}
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="table-cell border-t lg:text-right text-center">
        <button
          className="text-gray-400 dark:text-teal-700 text-sm pr-2 hover:text-gray-500"
          onClick={() => {
            setEdit(false);
          }}
        >
          annulla
        </button>
      </div>
    </div>
  );
};

export default TableRowInput;
