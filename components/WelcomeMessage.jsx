import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const WelcomeMessage = (props) => {
  const { items } = props;
  return (
    <div className="bg-gray-100 dark:bg-slate-800 font-semibold sm:flex sm:h-screen sm:space-y-0 -space-y-3 sm:justify-center w-screen ">
      <div className="p-2 ml-0.5 sm:ml-0  dark:text-white text-teal-900">
        <div className="flex space-x-2  lg:ml-0 sm:ml-6 items-center">
          <div className="flex items-center  h-14 w-14 border-4 sm:border-none  rounded-full border-teal-500 justify-center">
            <AddShoppingCartIcon fontSize="large" />
          </div>
          <div>aggiungi nuovi articoli</div>
          <div />
        </div>
      </div>
      <div className=" w-1  ml-9 sm:ml-0 lg:mx-10  bg-teal-500 h-16"></div>
      <div className="p-2 dark:text-white text-teal-900">
        <div className="flex space-x-2 sm:justify-center items-center">
          <div className="flex items-center  h-14 w-14 border-4 sm:border-none rounded-full border-teal-500 justify-center">
            <TouchAppIcon fontSize="large" />
          </div>
          <div className="text-center sm:text-left">
            modificali con un click
          </div>
          <div />
        </div>
      </div>
      <div className=" w-1 lg:mx-10 ml-9 sm:ml-0 bg-teal-500 h-16"></div>
      <div className="p-2 sm:ml-0 ml-0.5  dark:text-white text-teal-900">
        <div className="flex space-x-2 sm:justify-center items-center">
          <div className="flex items-center  h-14 w-14 border-4 sm:border-none rounded-full border-teal-500 justify-center">
            <TrendingFlatIcon fontSize="large" />
          </div>
          <div className="text-center sm:text-left">spostali nella scorte</div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
