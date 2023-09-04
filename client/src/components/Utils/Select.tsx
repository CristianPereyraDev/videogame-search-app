import styles from './Select.module.css';

export default function Select({
  title,
  value,
  onChange,
  options,
}: {
  title: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className={styles.container}>
      <select onChange={onChange} value={value}>
        <option value=''>{title}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
