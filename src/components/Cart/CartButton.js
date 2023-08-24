import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { cartVisibilityActions } from "../../store/store";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const cartItemNumber = useSelector((state) => state.cartData.totalQuantity);
  const dispatch = useDispatch();
  const bottonHandler = () => {
    dispatch(cartVisibilityActions.toggle());
  };
  return (
    <button className={classes.button} onClick={bottonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemNumber}</span>
    </button>
  );
};

export default CartButton;
