const TableHeader = (props) => {
  const { setOrder } = props;
  return (
    <div className="table-header-group">
      <div className="table-row text-gray-600 text-sm font-semibold ">
        <div
          onClick={() => {
            setOrder("name");
          }}
          className="table-cell pl-2 text-left "
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
  );
};

export default TableHeader;
