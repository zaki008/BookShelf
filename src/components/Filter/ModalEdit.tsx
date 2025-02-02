import { bookStatus, categoryBook } from "@/constants";
import { getBooks, putBook } from "@/redux/slice/bookSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Loading from "@/ui/loading";
import Modal from "@/ui/Modal";
import Select from "@/ui/Select";
import { alertMessage } from "@/utils/alertMessage";
import { schemaEditBook } from "@/utils/ValidationSchema";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  setModalOpen: (updater: (prev: boolean) => boolean) => void;
  data: bookProps | null;
}

const ModalEdit = ({ setModalOpen, data }: IProps) => {
  const { isLoading } = useSelector((state: RootState) => state.book);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Modal title="Edit Buku" setModalOpen={setModalOpen}>
      <Formik
        initialValues={{
          judul: data?.title,
          penulis: data?.author,
          isbn: data?.isbn,
          cover: data?.cover,
          kategori: data?.category,
          status: data?.status,
        }}
        validationSchema={schemaEditBook}
        onSubmit={async (values) => {
          const newValues = {
            title: values.judul,
            author: values.penulis,
            isbn: values.isbn,
            cover: values.cover,
            category: values.kategori,
            status: values.status,
          };
          const sendData = {
            id: data?.id,
            newValues,
          };
          const result = await dispatch(putBook(sendData));
          if (putBook.fulfilled.match(result)) {
            setModalOpen((prev) => !prev);
            dispatch(getBooks());
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          const handleSelectChange = (
            event: React.ChangeEvent<HTMLSelectElement>
          ) => {
            const { name, value } = event.target;
            if (name === "kategori") {
              setFieldValue("kategori", value);
            }
            if (name === "status") {
              setFieldValue("status", value);
            }
          };
          const handleImage = async (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const file = event.target.files?.[0] || null;
            if (file) {
              if (file.type == "image/jpeg" || file.type == "image/png") {
                setFieldValue("cover", file);
              } else {
                alertMessage(
                  "Please select a valid JPEG or PNG image.",
                  "error"
                );
              }
            }
          };
          return (
            <form className="w-full mx-auto" onSubmit={handleSubmit}>
              <div className="w-full grid grid-cols-2 gap-3">
                <Input
                  title="Judul"
                  type="text"
                  name="judul"
                  placeholder="Input Your Judul"
                  value={values.judul}
                  error={errors.judul && touched.judul ? errors.judul : ""}
                  onChange={handleChange}
                />
                <Input
                  title="Penulis"
                  type="text"
                  name="penulis"
                  placeholder="Input Your Penulis"
                  value={values.penulis}
                  error={
                    errors.penulis && touched.penulis ? errors.penulis : ""
                  }
                  onChange={handleChange}
                />
                <Input
                  title="ISBN"
                  type="text"
                  name="isbn"
                  placeholder="Input Your ISBN"
                  value={values.isbn}
                  error={errors.isbn && touched.isbn ? errors.isbn : ""}
                  onChange={handleChange}
                />
                <Select
                  className="mb-3"
                  title="Kategori"
                  id="kategori"
                  name="kategori"
                  options={categoryBook}
                  placeholder="Pilih Kategori"
                  value={values.kategori}
                  error={
                    errors.kategori && touched.kategori ? errors.kategori : ""
                  }
                  onChange={handleSelectChange}
                />
                <Select
                  className="mb-3"
                  title="Status Baca"
                  id="status"
                  name="status"
                  options={bookStatus}
                  placeholder="Pilih Status"
                  value={values.status}
                  error={errors.status && touched.status ? errors.status : ""}
                  onChange={handleSelectChange}
                />
                <Input
                  title="Cover Image"
                  type="file"
                  name="cover"
                  placeholder="Input Your Cover Image"
                  error={errors.cover && touched.cover ? errors.cover : ""}
                  onChange={handleImage}
                />
              </div>
              {isLoading ? (
                <Loading type="loadBtn" />
              ) : (
                <Button className="mt-3" title={"Submit"} type="submit" />
              )}
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ModalEdit;
