import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";

const Notification = (props) => {
  const { setMessageForUser, messageForUser } = props;
  return (
    <div className="p-4 space-x-5 flex absolute rounded-lg bg top-2 right-2 z-40 bg-gray-100 text-sm shadow ">
      {(messageForUser[0] === "Articoli trasferiti correttamente" && (
        <CheckCircleOutlineIcon className="text-teal-500" />
      )) || <WarningIcon className="text-yellow-500" />}

      <div>
        <p className=" text-gray-700">{messageForUser[0]}</p>
        <p className="text-gray-400">{messageForUser[1]}</p>
      </div>
      <div
        onClick={() => {
          setMessageForUser(null);
        }}
      >
        <CloseIcon className="hover:scale-125 text-gray-400" />
      </div>
    </div>
  );
};

export default Notification;
