import React from 'react';
import { TPokemonLight } from '../redux/reducers/main';
import styles from '../styles/List.module.css';
import { PokemonListItem } from './PokemonListItem';

export const PokemonsList = ({ pokemons,  }: { pokemons: TPokemonLight[] }) => (
  <ul className={styles.PokemonList} data-cy-test="cy-PokemonsList">
    {pokemons.map((pokemon: TPokemonLight) => <PokemonListItem key={`pokemon-index-${pokemon.name}`} pokemon={pokemon} />)}
  </ul>
);

export default PokemonsList;