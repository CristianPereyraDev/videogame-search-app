import styles from "./Select.module.css";

export default function Select(props) {
  const { options, titleOption, changeHandler } = props;

  return (
    <div className={styles.container}>
      <select onChange={changeHandler}>
        <option value={titleOption.value}>{titleOption.name}</option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
