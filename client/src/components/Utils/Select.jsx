import styles from "./Select.module.css";

export default function Select(props) {
  const { value, options, onChange } = props;

  return (
    <div className={styles.container}>
      <select onChange={onChange} value={value}>
        <option value=""></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
