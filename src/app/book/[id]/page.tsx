"use client";
import InfoDetail from "@/components/InfoDetail";
import LayoutDashboard from "@/components/Layout/LayoutDashboard";
import { getBookById } from "@/redux/slice/bookSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Loading from "@/ui/loading";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { dataBook, isLoading } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    dispatch(getBookById(id));
  }, [id]);

  return (
    <LayoutDashboard>
      <div className="mt-3 w-full flex justify-center ">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-full lg:2/3 xl:w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center w-full mt-3">
              <Image
                className="rounded-t-lg "
                src={dataBook.cover || ""}
                alt=""
                height={80}
                width={200}
              />
            </div>
            <div className="p-5">
              <h5 className=" text-center mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {dataBook.title}
              </h5>
              <div className="grid md:grid-cols-2 gap-1 mg-3">
                <InfoDetail title={"Penulis"} subtitle={dataBook?.author} />
                <InfoDetail title={"ISBN"} subtitle={dataBook?.isbn} />
                <InfoDetail title={"Kategori"} subtitle={dataBook?.category} />
                <InfoDetail title={"Status"} subtitle={dataBook?.status} />
                <InfoDetail
                  title={"Publish"}
                  subtitle={moment(dataBook?.createdAt).format("DD MMM YYYY")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutDashboard>
  );
};

export default DetailBook;
