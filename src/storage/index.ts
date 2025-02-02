import Cookies from "js-cookie";

const cookieStorage = {
  getItem: (key: string): Promise<string | undefined> => {
    return new Promise((resolve) => {
      const value = Cookies.get(key);
      resolve(value);
    });
  },
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      Cookies.set(key, value, { expires: 365 });
      resolve();
    });
  },
  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      Cookies.remove(key);
      resolve();
    });
  },
};

export default cookieStorage;
