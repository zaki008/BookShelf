import { toast } from "react-toastify";

export function alertMessage(message: string, type: string) {
  let toastType;

  switch (type) {
    case "success":
      toastType = toast.success;
      break;
    case "error":
      toastType = toast.error;
      break;
    case "warning":
      toastType = toast.warning;
      break;
    case "info":
      toastType = toast.info;
      break;
    default:
      toastType = toast.info;
  }

  toastType(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
