import ModeEditIcon from "@mui/icons-material/ModeEdit";

const TableRow = (props) => {
  const {
    name,
    id,
    quantity,
    date,
    index,
    setQuantity,
    setIndex,
    setNewItemName,
    setEdit,
  } = props;
  return (
    <div key={id} className=" table-row">
      <div className="table-cell pl-2  text-sm dark:text-white dark:border-t-slate-600 text-gray-600 py-2 border-t">
        {name}
      </div>
      <div className="table-cell dark:text-white text-sm py-2 dark:border-t-slate-600 border-t">{`x${quantity}`}</div>
      <div className="table-cell py-2 dark:text-white dark:border-t-slate-600 border-t text-sm  text-center">
        {date.substring(5, 10)}
      </div>
      <div
        onClick={(e) => {
          setIndex(index);
          setNewItemName(name);
          setQuantity(quantity);
          setEdit(true);
        }}
        className="table-cell  py-2 dark:border-t-slate-600 border-t text-purple-500 text-center lg:text-right  text-sm"
      >
        <ModeEditIcon className="lg:mr-2 hover:text-purple-700" />
      </div>
    </div>
  );
};

export default TableRow;
