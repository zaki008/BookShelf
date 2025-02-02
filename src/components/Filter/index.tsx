import { bookStatus } from "@/constants";
import { changeStatus, changeTitle } from "@/redux/slice/bookSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Button from "@/ui/Button";
import Search from "@/ui/Search";
import Select from "@/ui/Select";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCreate from "./ModalCreate";

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalOpen, setModalOpen] = useState(false);
  const { status, title } = useSelector((state: RootState) => state.book);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeTitle(value));
  };

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch(changeStatus(value));
  };

  return (
    <div className="mt-5 mb-3 lg:flex lg:flex-row lg:justify-between lg:items-center">
      <div className="flex flex-col tiny:flex-row  xl:w-1/2 gap-3 items-center">
        <Search value={title} onChange={handleSearch} />
        <Select
          placeholder="Pilih Status"
          value={status}
          options={bookStatus}
          id="status"
          name="status"
          onChange={handleChangeStatus}
        />
      </div>
      <Button
        title="+ Tambah Buku"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3 lg:mt-1"
        onClick={() => setModalOpen(!modalOpen)}
      />
      {modalOpen && <ModalCreate setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Filter;
