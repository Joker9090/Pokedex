import React from 'react';
import { PokemonFilter } from './PokemonFilter';
import { PokemonsList } from './PokemonList';
import { PokemonsAddLocalBtn } from './PokemonsAddLocalBtn';
import styles from '../styles/MainContent.module.css';

export const PokemonMainContent = ({ pokemons, query, setQuery, letter, setLetter, type, setType, tab, setTab }: any) => {
  // TODO: DRILLING PROPS for One Entry point in container page
  return (
    <div className={styles.PokemonMainContent}>
      <PokemonFilter query={query} setQuery={setQuery} letter={letter} setLetter={setLetter} type={type} setType={setType} tab={tab} setTab={setTab} />
      <PokemonsList pokemons={pokemons} />
      <PokemonsAddLocalBtn />
    </div>
  )
}


export default PokemonMainContent;