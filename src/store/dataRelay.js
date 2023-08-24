import { useSelector, useDispatch } from "react-redux";
import { cartVisibilityActions } from "./store/store";
import Notification from "./components/UI/Notification";

export const sendData = () => {
  const dispatch = useDispatch();
  const code = async () => {
    dispatch(
      cartVisibilityActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "updating the cart",
      })
    );
    const response = await fetch(
      "https://react-try-49f0c-default-rtdb.firebaseio.com/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cartData),
      }
    );
    if (!response.ok) {
      throw new Error("request failehhhhd");
    }

    dispatch(
      cartVisibilityActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Updated the cart",
      })
    );
  };
  if (initialLoad) {
    initialLoad = false;
    return;
  }
  try {
    code();
  } catch {
    dispatch(
      cartVisibilityActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Cart data not updated",
      })
    );
  }
};
