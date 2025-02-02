"use client";
import {
  changeFilter,
  getBooks,
  resetBookRedux,
} from "@/redux/slice/bookSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Content from "@/ui/Content";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import Filter from "../Filter";
import LayoutDashboard from "../Layout/LayoutDashboard";
import Stats from "../Stats/Stats";
import Table from "../Table";

const Home = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector((state: RootState) => state.book);
  const page = useSelector((state: RootState) => state.book.page);
  const status = useSelector((state: RootState) => state.book.status);
  const { title } = useSelector((state: RootState) => state.book);

  const [value] = useDebounce(title, 1000);

  const getDataBook = async (params: URLSearchParams) => {
    const result = await dispatch(getBooks());
    if (getBooks.fulfilled.match(result)) {
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    const initialPage = searchParams.get("page");
    const initalTitle = searchParams.get("title");
    const initalStatus = searchParams.get("status");

    dispatch(
      changeFilter({
        page: initialPage ? parseInt(initialPage, 10) : 1,
        title: initalTitle || "",
        status: initalStatus || "",
      })
    );
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("title", value);
    params.set("status", status);

    console.log("params", params);

    Array.from(params.keys()).forEach((key) => {
      if (!params.get(key)) {
        params.delete(key);
      }
    });

    getDataBook(params);
  }, [page, value, status]);

  useEffect(() => {
    return () => {
      dispatch(resetBookRedux());
    };
  }, []);

  return (
    <LayoutDashboard>
      <Content>
        <Stats count={data?.countBook || {}} />
        <Filter />
        <Table data={data} isLoading={isLoading} page={page} />
      </Content>
    </LayoutDashboard>
  );
};

export default Home;
