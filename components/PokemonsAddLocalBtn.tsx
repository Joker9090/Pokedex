import React from 'react';
import styles from '../styles/List.module.css';
import Link from "next/link";

export const PokemonsAddLocalBtn = () => (
  <Link href={`/create`}>
    <div className={styles.PokemonsAddLocalBtn}>
      <p>Create Local Pokemon</p>
    </div>
  </Link>
);

export const PokemonsAddLocalBtnConnected = ({ value, onClick }: { value: string; onClick: any }) => (
  <div className={`${styles.PokemonsAddLocalBtn} ${styles.PokemonsAddLocalBtnPushed}`} onClick={onClick}>
    <p>{value}</p>
  </div>
);


export default PokemonsAddLocalBtn;