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
        <Link to={`/detail/${props.id}`}>
          <h3>{props.name}</h3>
        </Link>
        <h4>
          {props.genres.forEach((genre) => (
            <Link>{genre}</Link>
          ))}
        </h4>
      </div>
    </div>
  );
}
