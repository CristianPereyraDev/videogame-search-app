import styles from "./NavBar.module.css";

export default function NavBar(props) {
  return (
    <div>
      <div>Henry Videogames</div>
      <div>
        <input type="search" />
        <button>Search</button>
      </div>
    </div>
  );
}
