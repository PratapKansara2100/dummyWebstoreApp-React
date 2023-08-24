import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { cartVisibilityActions, cartDataActions } from "./store/store";
import Notification from "./components/UI/Notification";

let initialLoad = true;
function App() {
  const dispatch = useDispatch();
  const cartDisplayBool = useSelector(
    (state) => state.cartVisibility.something
  );
  const cartData = useSelector((state) => state.cartData);
  const notification = useSelector(
    (state) => state.cartVisibility.notification
  );
  const dataChangedBool = useSelector((state) => state.cartData.changed);

  useEffect(() => {
    const sendData = async () => {
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
          title: "Sent!",
          message: "Updated the cart",
        })
      );
    };
    if (initialLoad || !dataChangedBool) {
      initialLoad = false;
      return;
    }
    sendData().catch((err) => {
      dispatch(
        cartVisibilityActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Cart data not updated",
        })
      );
    });
  }, [cartData, dispatch]);

  useEffect(() => {
    const recieveData = async () => {
      dispatch(
        cartVisibilityActions.showNotification({
          status: "pending",
          title: "Loading Data...",
          message: "updating the cart",
        })
      );
      const response = await fetch(
        "https://react-try-49f0c-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("could not fetch cart");
      }

      const data = await response.json();
      dispatch(
        cartDataActions.replace({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
          changed: data.changed,
        })
      );
      dispatch(cartVisibilityActions.removeNotification());
    };

    recieveData().catch((err) => {
      dispatch(
        cartVisibilityActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Cart data not recieved",
        })
      );
    });
  }, []);

  return (
    <>
      {notification && <Notification data={notification} />}
      <Layout>
        {cartDisplayBool && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
