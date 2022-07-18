import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-actions";
import { fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.showCart.isShowCart);
  const cart = useSelector((state) => state.cart);

  const notification = useSelector((state) => state.showCart.notification);

  const dispatch = useDispatch();

  /************************ SIDE EFFECT FUNCTION WITHIN THE COMPONENT ******************************/
  // useEffect(() => {
  // const cartData = async () => {
  // dispatch(
  //   showCartActions.showNotification({
  //     status: "pending",
  //     title: "sending",
  //     message: "sending cart data",
  //   })
  // );
  // const response = await fetch(
  //   "https://cartitems-4c270-default-rtdb.firebaseio.com/cart.json",
  //   {
  //     method: "PUT",
  //     body: JSON.stringify(cart),
  //   }
  // );

  // if (!response.ok) {
  //   throw new Error("sending cart data fail");
  // }

  // dispatch(
  //   showCartActions.showNotification({
  //     status: "success",
  //     title: "success !",
  //     message: "sent cart data successfully",
  //   })
  // );
  // };

  // if(isInitial){
  //   isInitial = false;
  //   return;
  // }
  // cartData().catch((err) => {
  // dispatch(
  //   showCartActions.showNotification({
  //     status: "error",
  //     title: "error !",
  //     message: "could not store cart data",
  //   })
  // );
  // });
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.isChanged) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
