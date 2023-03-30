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
    const newState = { ...order, method: e.target.value };
    setOrder(newState);
    dispatch(orderVideogames(newState));
  }

  return (
    <div>
      <select onChange={handleOrderByChange}>
        <option value="">Order By</option>
        <option value="name">Nombre</option>
        <option value="rating">Rating</option>
      </select>
      <div>
        <input
          type="radio"
          name="order"
          id="asc"
          value={OrderMethod.Ascendent}
          checked={order.method === OrderMethod.Ascendent}
          onChange={handleOrderChange}
        />
        <label htmlFor="asc">{OrderMethod.Ascendent}</label>
        <input
          type="radio"
          name="order"
          id="desc"
          value={OrderMethod.Descendent}
          checked={order.method === OrderMethod.Descendent}
          onChange={handleOrderChange}
        />
        <label htmlFor="desc">{OrderMethod.Descendent}</label>
      </div>
    </div>
  );
}
