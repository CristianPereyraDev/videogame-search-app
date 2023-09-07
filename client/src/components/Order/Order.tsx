import styles from './Order.module.css';
import Select from '../Utils/Select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { updateOrder } from '../../features/games/gamesSlice';

export default function Order() {
  // Sync with global state
  const { order } = useSelector((state: RootState) => state.games);

  const dispatch = useDispatch<AppDispatch>();

  function handleOrderByChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newOrderState = { field: e.target.value, isReversed: true };

    dispatch(updateOrder(newOrderState));
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isReversed = e.target.checked ? false : true;
    const newOrderState = { field: 'order', isReversed };

    dispatch(updateOrder(newOrderState));
  }

  return (
    <div className={styles.orderContainer}>
      {/* Order by select */}
      <div className={styles.select}>
        <label>Order by:</label>
        <Select
          title='Sin ordenar'
          value={order ? order.field : 'name'}
          options={[
            { value: 'name', label: 'Nombre' },
            { value: 'released', label: 'Released' },
            { value: 'added', label: 'Added' },
            { value: 'created', label: 'Created' },
            { value: 'updated', label: 'Updated' },
            { value: 'rating', label: 'Rating' },
            { value: 'metacritic', label: 'Metacritic' },
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
