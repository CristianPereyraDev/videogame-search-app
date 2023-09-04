import styles from './Order.module.css';
import Select from '../Utils/Select';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export default function Order({
  handlerChange,
}: {
  handlerChange: (order: { field: string; isReversed: boolean }) => void;
}) {
  // Sync with global state
  const { order } = useSelector((state: RootState) => state.games);

  function handleOrderByChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newGlobalState = { ...order, field: e.target.value };
    // El manejador viene por props para que el componente padre mantenga sincronizado los filtros y ordenamientos.
    handlerChange(newGlobalState);
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isReversed = e.target.checked ? false : true;
    const newGlobalState = { ...order, isReversed };
    handlerChange(newGlobalState);
  }

  return (
    <div className={styles.orderContainer}>
      {/* Order by select */}
      <div className={styles.select}>
        <label>Order by:</label>
        <Select
          title='Sin ordenar'
          value={order.field}
          options={[
            { value: 'name', label: 'Nombre' },
            { value: 'rating', label: 'Rating' },
          ]}
          onChange={handleOrderByChange}
        />
      </div>
      {/* Order method */}
      <div className={styles.orderMethod}>
        <span>Des.</span>
        <label className={styles.switch}>
          <input
            type='checkbox'
            name='order'
            id='order'
            //checked={order.method === OrderMethod.Ascendent}
            onChange={handleOrderChange}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <span>Asc.</span>
      </div>
    </div>
  );
}
