import { useState } from "react";
import { OrderMethod } from "../../utils/reducer.util";
import styles from "./Order.module.css";
import Select from "../Utils/Select";

export default function Order(props) {
  const [order, setOrder] = useState({
    by: "",
    method: OrderMethod.Ascendent,
  });

  function handleOrderByChange(e) {
    const newState = { ...order, by: e.target.value };
    // La funcion setOrder actualiza el estado de manera asíncrona, por lo tanto,
    // cuando hago el dispath tengo que pasarle la variable newState.
    setOrder(newState);
    props.handlerChange(newState);
  }

  function handleOrderChange(e) {
    const orderMethod = e.target.checked
      ? OrderMethod.Ascendent
      : OrderMethod.Descendent;
    const newState = { ...order, method: orderMethod };
    setOrder(newState);
    props.handlerChange(newState);
  }

  return (
    <div className={styles.orderContainer}>
      <div className={styles.select}>
        <Select
          titleOption={{ value: "none", name: "Order By:" }}
          options={[
            { id: 1, value: "name", name: "Nombre" },
            { id: 2, value: "rating", name: "Rating" },
          ]}
          changeHandler={handleOrderByChange}
        />
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
