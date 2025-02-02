interface Paging {
  size: number;
  page: number;
  total_item: number;
  total_page: number;
}

export const generatePagingText = (
  paging: Paging,
  itemName: string = "Buku"
): string => {
  if (paging) {
    const { size, page, total_item } = paging;
    const start = (page - 1) * size + 1;
    const end = Math.min(page * size, total_item);
    return `Menampilkan ${start} - ${end} dari ${total_item} ${itemName}`;
  }
  return "";
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string); // Mengembalikan hasil sebagai string
    };
    reader.onerror = reject; // Menangani error
    reader.readAsDataURL(file); // Membaca file sebagai data URL
  });
};
