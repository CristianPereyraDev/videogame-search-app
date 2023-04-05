import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "../../redux/actions/actions";

export default function Card(props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={props.image} alt="" />
      </div>
      <div className={styles.cardText}>
        <div className={styles.cardTitle}>
          <Link to={`/detail/${props.id}`}>{props.name}</Link>
        </div>
        <div className={styles.cardGenres}>
          <label>Géneros:</label>
          {props.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
