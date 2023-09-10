import styles from './NavBar.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import LogoIcon from '../Icons/LogoIcon';

export default function NavBar() {
  const location = useLocation();
  return (
    <div className={styles.navbar}>
      {/* Home link */}
      <div className={styles.homeLinkContainer}>
        <NavLink
          style={{ height: '100%' }}
          onClick={
            location.pathname === '/'
              ? () => {
                  window.location.reload();
                }
              : undefined
          }
          to='/'
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? `${styles.active}` : ``
          }
        >
          <LogoIcon />
        </NavLink>
      </div>
    </div>
  );
}
