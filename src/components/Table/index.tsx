import { addnewPage, deleteBook, getBooks } from "@/redux/slice/bookSlice";
import { AppDispatch } from "@/redux/store";
import Badge from "@/ui/badge";
import Loading from "@/ui/loading";
import ModalDelete from "@/ui/ModalDelete";
import Pagination from "@/ui/Pagination";
import { generatePagingText } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import ModalEdit from "../Filter/ModalEdit";

interface IProps {
  data: booksResponse;
  isLoading?: boolean;
  page?: string | number;
}

const Table = ({ data, page, isLoading }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<null | number | string>(null);
  const [dataEdit, setDataEdit] = useState<bookProps | null>({
    id: null,
    title: "",
    author: "",
    isbn: "",
    cover: "",
    category: "",
    status: "",
  });

  const handlePageChange = (page: number) => {
    dispatch(addnewPage(page));
  };

  useEffect(() => {
    return () => {
      setIdDelete(null);
      setDataEdit(null);
    };
  }, []);

  const handleDelete = async () => {
    const result = await dispatch(deleteBook(Number(idDelete)));
    if (deleteBook.fulfilled.match(result)) {
      setIdDelete(null);
      setModalOpen((prev) => !prev);
      dispatch(getBooks());
    }
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-sm ">
        <table
          style={{ borderRadius: 200 }}
          className="w-full text-sm text-left rtl:text-right text-gray-500 
      dark:text-gray-400 border-gray-200 dark:border-gray-500 border-4"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Judul & Penulis
              </th>
              <th scope="col" className="px-6 py-3">
                Kategori
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4}>
                  <div className="flex justify-center w-full">
                    <Loading />
                  </div>
                </td>
              </tr>
            ) : Array.isArray(data?.data) && data?.data.length > 0 ? (
              data.data.map((item) => (
                <tr
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/book/${item.id}`);
                  }}
                  key={item.id}
                  className="cursor-pointer odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-semibold text-base capitalize">
                      {item.title}
                    </p>
                    <p className="font-light text-xs capitalize">
                      {item.author}
                    </p>
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">
                    <Badge status={item.status} />
                  </td>
                  <td className="px-6 py-4 flex flex-row items-center">
                    <span
                      className="cursor-pointer mr-3 relative z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDataEdit(item);
                        setModalEditOpen((prev) => !prev);
                      }}
                    >
                      <MdEdit className="text-blue-600 text-xl" />
                    </span>
                    <span
                      className="cursor-pointer relative z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIdDelete(item?.id);
                        setModalOpen(!modalOpen);
                      }}
                    >
                      <MdDelete className="text-red-600 text-xl" />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <div className="flex justify-center w-full">
                    <span className="mt-5 mb-5 font-bold text-lg text-center text-gray-700 dark:text-gray-300">
                      Anda Belum Memiliki Buku
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="md:flex md:flex-row justify-between mt-3 md:items-center">
        <p className="font-medium text-sm">
          {Array.isArray(data?.data) &&
            data?.data.length > 0 &&
            generatePagingText(data?.paging)}
        </p>

        {Array.isArray(data?.data) && data?.data.length > 0 && (
          <Pagination
            page={page || 1}
            total_page={data?.paging?.total_page || 1}
            onPageChange={handlePageChange}
          />
        )}
        {modalOpen && (
          <ModalDelete
            title={"Anda Yakin Ingin Mengapus Data Ini"}
            handleYes={handleDelete}
            handleNo={() => {
              setIdDelete(null);
              setModalOpen((prev) => !prev);
            }}
            isLoading={isLoading}
          />
        )}
        {modalEditOpen && (
          <ModalEdit data={dataEdit} setModalOpen={setModalEditOpen} />
        )}
      </div>
    </>
  );
};

export default Table;
