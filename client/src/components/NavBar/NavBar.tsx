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
          onClick={
            location.pathname === '/home'
              ? () => {
                  window.location.reload();
                }
              : undefined
          }
          to='/home'
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
