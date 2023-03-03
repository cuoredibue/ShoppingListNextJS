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
    <div className="animate-[enterFromLeft_300ms] table-row bg-yellow-200 text-gray-600  ">
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
  );
};

export default TableRowInput;
