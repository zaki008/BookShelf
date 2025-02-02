export interface payloadRegister {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface payloadLogin {
  email: string;
  password: string;
}

export interface payloadGetBook {
  size: string | number;
  page: string | number;
}

export interface payloadCreateBook {
  title: string;
  author: string;
  isbn: string;
  cover: any;
  category: string;
  status: string;
}
