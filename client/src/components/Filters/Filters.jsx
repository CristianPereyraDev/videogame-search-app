import styles from "./Filters.module.css";

export default function Filters(props) {
  return (
    <div>
      <select>
        <option value="hide">Source filter</option>
        <option>API</option>
        <option>Database</option>
      </select>
      <select>
        <option value="hide">Genre filter</option>
        <option>Genre1</option>
        <option>Genre2</option>
        <option>Genre1</option>
      </select>
    </div>
  );
}
