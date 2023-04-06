import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderVideogames } from "../../redux/actions/actions";
import { OrderMethod } from "../../utils/reducer.util";
import styles from "./Order.module.css";

export default function Order(props) {
  const [order, setOrder] = useState({
    by: "",
    method: OrderMethod.Ascendent,
  });
  const dispatch = useDispatch();

  function handleOrderByChange(e) {
    const newState = { ...order, by: e.target.value };
    // La funcion setOrder actualiza el estado de manera asíncrona, por lo tanto,
    // cuando hago el dispath tengo que pasarle la variable newState.
    setOrder(newState);
    dispatch(orderVideogames(newState));
  }

  function handleOrderChange(e) {
    const orderMethod = e.target.checked
      ? OrderMethod.Ascendent
      : OrderMethod.Descendent;
    const newState = { ...order, method: orderMethod };
    setOrder(newState);
    dispatch(orderVideogames(newState));
  }

  return (
    <div className={styles.orderContainer}>
      <div className={styles.select}>
        <select onChange={handleOrderByChange}>
          <option value="">Order By</option>
          <option value="name">Nombre</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          name="order"
          id="order"
          checked={order.method === OrderMethod.Ascendent}
          onChange={handleOrderChange}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}
