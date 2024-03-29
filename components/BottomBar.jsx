import { AddData, DeleteData } from "../components/database";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { supabase } from "../pages";
const BottomBar = (props) => {
  const { database, refresh, items, setMessage } = props;

  ///////////////////////delete checked items////////////////////
  const deleteCheckedItems = () => {
    items.map((item) => {
      DeleteData(database, "checked", true);
    });
    refresh();
  };

  // verify if item already exist, then add or update item
  const fetchSingleItem = async (name, quantity) => {
    const { data: previousData, error } = await supabase
      .from("scorte")
      .select()
      .eq("name", name)
      .single();
    if (error) {
      console.log(error);
    }
    if (previousData) {
      const newQuantity = quantity + previousData.quantity;
      const { data, error } = await supabase.from("scorte").upsert({
        id: previousData.id,
        name,
        quantity: newQuantity,
      });
      if (error) {
        console.log(error);
      }
    }
    if (!previousData) {
      AddData("scorte", name, quantity);
    }
  };
  ////////////// transfer checked items from list to warehouse ////////////////
  const handleTransfer = async () => {
    let checkedItems = items.filter((item) => {
      return item.checked === true;
    });
    if (checkedItems.length === 0) {
      setMessage(["Niente da spostare", "contrassegna almeno un articolo"]);
      return;
    }

    await checkedItems.map((item) => {
      const { name, quantity } = item;
      fetchSingleItem(name, quantity);
    });

    deleteCheckedItems();
    setMessage([
      "Articoli trasferiti correttamente",
      "controlla la pagina scorte",
    ]);
    refresh();
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="p-2 bg-gray-100 dark:bg-slate-800 w-screen 2xl:bottom-20  sticky bottom-0 z-10">
        <div className=" h-8 flex sm:justify-center xl:h-10 flex-row-reverse dark:sm:bg-slate-800 sm:bg-gray-100 bg-orange-200  rounded-full">
          <button
            type="button"
            onClick={() => {
              setMessage(null);
              openModal();
            }}
            className="sm:w-80 sm:hover:bg-purple-700 sm:rounded-lg w-full xl:w-full xl:max-w-md rounded-full  bg-purple-600 text-purple-200 border-none border font-normal "
          >
            <ShoppingCartIcon />
            Fatto
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black dark:bg-opacity-70 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex sm:min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl dark:bg-slate-800 bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 dark:text-white text-gray-900"
                  >
                    Termina spesa
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm dark:text-gray-100 text-gray-500">
                      Con questa azione gli articoli contrassegnati verranno
                      rimossi e aggiunti alla lista scorte, proseguire?
                    </p>
                  </div>

                  <div className="mt-4 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent dark:bg-emerald-400 dark:hover:bg-emerald-500 bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleTransfer();
                        closeModal();
                      }}
                    >
                      Conferma
                    </button>
                    <button
                      className="text-gray-500 dark:text-gray-400"
                      onClick={closeModal}
                    >
                      annulla
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BottomBar;
