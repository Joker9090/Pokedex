import React from 'react';
import Head from 'next/head'
import styles from '../../styles/Header.module.css';

const Header = ({ children }: any) =>  (
  <div className={styles.Header}>
    <Head>
      <title>Pokedex!</title>
      <meta name="description" content="Pokedex Challenge" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </div>
);

export default Header;