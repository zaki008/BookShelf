declare interface book {
  id: string | number;
  title: string;
  author: string;
  isbn: string;
  cover: string | null;
  category: string;
  status: string;
  username?: string;
  createdAt: string;
  updatedAt?: string;
}

declare interface booksResponse {
  paging: {
    size: number;
    page: number;
    total_item: number;
    total_page: number;
  };
  data: book[];
}

declare interface bookProps {
  id: null | string | number;
  title: string;
  author: string;
  isbn: string;
  cover: string | null;
  category: string;
  status: string;
}

declare interface bookDetail {
  data: {
    id: string | number;
    title: string;
    author: string;
    isbn: string;
    cover: string | null;
    category: string;
    status: string;
    username?: string;
    createdAt: string;
    updatedAt?: string;
  };
}
