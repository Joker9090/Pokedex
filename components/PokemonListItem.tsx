import React, { useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import { TPokemonLight } from '../redux/reducers/main';
import Link from "next/link";
import styles from '../styles/List.module.css';

export const PokemonListItem = ({ pokemon }: { pokemon: TPokemonLight }) => {
  const myRef = useRef();
  const {
    inViewport,
    // enterCount,
    // leaveCount,
  } = useInViewport(
    // @ts-ignore
    myRef
  );
  return (
    <>
      { /* @ts-ignore */}
      <li ref={myRef}>
        <Link href={`/${pokemon.name}`}>
          <div className={styles.PokemonListItem}>
            <div>
              {pokemon.name}
              {inViewport}
            </div>
            <div>
              {inViewport && (
                <img src={pokemon.image} alt={pokemon.name} />
              )}
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

export default PokemonListItem;