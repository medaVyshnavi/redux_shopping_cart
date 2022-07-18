import classes from './CartItem.module.css';
import {useDispatch , useSelector} from 'react-redux'
import { cartActions } from '../../store';

const CartItem = (props) => {
  const { title, quantity, total, price ,id } = props.item;

  const dispatch = useDispatch();

  const subtractHandler = () => {
    dispatch(cartActions.subtractQuantity(id))
  }

  const addHandler = () => {
    dispatch(cartActions.addQuantity({
      title, 
      quantity, 
      total,
      price ,
      id
    }))
  }
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${(quantity*price).toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={subtractHandler}>-</button>
          <button onClick={addHandler} >+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
