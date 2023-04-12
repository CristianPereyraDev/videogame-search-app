import { useState } from "react";
import { OrderMethod } from "../../utils/reducer.util";
import styles from "./Order.module.css";
import Select from "../Utils/Select";
import { useSelector } from "react-redux";

export default function Order(props) {
  // Sync with global state
  const { order } = useSelector((state) => state);

  function handleOrderByChange(e) {
    const newGlobalState = { ...order, by: e.target.value };
    props.handlerChange(newGlobalState);
  }

  function handleOrderChange(e) {
    const orderMethod = e.target.checked
      ? OrderMethod.Ascendent
      : OrderMethod.Descendent;
    const newGlobalState = { ...order, method: orderMethod };
    props.handlerChange(newGlobalState);
  }

  return (
    <div className={styles.orderContainer}>
      {/* Order by select */}
      <div className={styles.select}>
        <Select
          value={order.by}
          options={[
            { value: "name", label: "Nombre" },
            { value: "rating", label: "Rating" },
          ]}
          onChange={handleOrderByChange}
        />
      </div>
      {/* Order method */}
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
