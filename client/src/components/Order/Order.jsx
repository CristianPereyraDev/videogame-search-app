import styles from "./Order.module.css";

export default function Order(props) {
  return (
    <div>
      <select>
        <option value="hide">Order By</option>
        <option>Nombre</option>
        <option>Rating</option>
      </select>
    </div>
  );
}
