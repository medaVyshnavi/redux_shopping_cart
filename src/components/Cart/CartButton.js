import classes from "./CartButton.module.css";
import { showCartActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(showCartActions.showCart());
  };
  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
