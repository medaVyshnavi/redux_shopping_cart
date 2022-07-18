import { showCartActions } from "./index";
import { cartActions } from "./index";
/*************************************USING ACTION CREATORS **************************/
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showCartActions.showNotification({
        status: "pending",
        title: "sending",
        message: "sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://cartitems-4c270-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("sending cart data fail");
      }
    };

    try {
      await sendRequest();
      dispatch(
        showCartActions.showNotification({
          status: "success",
          title: "success !",
          message: "sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        showCartActions.showNotification({
          status: "error",
          title: "error !",
          message: "could not store cart data",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://cartitems-4c270-default-rtdb.firebaseio.com/cart.json'
      );
      if (!response.ok) {
        throw new Error("couldnt fetch data");
      }
      const data = await response.json();
      return data;
    };

    try{
        const fetchedData = await fetchData();
        dispatch(cartActions.replaceCart({
            items : fetchedData.items || [],
            totalQuantity : fetchedData.totalQuantity
        }))
    }
    catch(error){
        dispatch(
            showCartActions.showNotification({
              status: "error",
              title: "error !",
              message: "could not fetch cart data",
            })
          );
    }
  };
};
