import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { useEffect } from 'react'
import { connect } from "react-redux"
import { setType, setQuery, setLetter, setTab, hidratePokemons, getPokemons } from "../redux/actions/main"
import { FilterObject, FilterTab, NETSTATUS, POKEMON_NET_TYPE, TPokemon, TPokemonReducer } from '../redux/reducers/main'
import Header from '../components/globals/Header'
import { LoadingScreen } from '../components/globals/Loading'
import { ErrorScreen } from '../components/globals/Error'
import { PokemonMainContent } from '../components/PokemonMainContent'

export type HomeProps = {
  children: React.ReactElement,
  getPokemons: any,
  hidratePokemons: any,
  setQuery: any,
  setLetter: any,
  setType: any,
  type: POKEMON_NET_TYPE,
  tab: FilterTab,
  setTab: any,
  pokemons: TPokemon[],
  pokemonsServerStatus: NETSTATUS,
  filter: FilterObject | null
}

const mapStateToProps = (state: any) => {
  const main: TPokemonReducer = state.main;
  return {
    tab: main.tab,
    filter: main.filter,
    pokemons: main.pokemonsFiltered,
    pokemonsServerStatus: main.pokemonsServerStatus
  }
}

const mapDispatchToProps = {
  setQuery,
  setLetter,
  setType,
  setTab,
  getPokemons,
  hidratePokemons
}

const Home = (props: HomeProps) => {
  const { filter, pokemonsServerStatus, setQuery, setLetter, tab, setType, pokemons, setTab, hidratePokemons, getPokemons } = props;

  useEffect(() => {
    if (pokemonsServerStatus != NETSTATUS.FETCH && pokemonsServerStatus != NETSTATUS.FETCHING) hidratePokemons();
    else if(filter) getPokemons(filter); 
  }, []);

  const checkWhat2Render = () => {
    switch (true) {
      case (pokemons.length == 0 && pokemonsServerStatus == NETSTATUS.FETCHING):
        return <LoadingScreen />;
      case (pokemonsServerStatus == NETSTATUS.FETCH_ERROR):
        return <ErrorScreen />;
      case (pokemons.length > 0 || pokemonsServerStatus == NETSTATUS.FETCH):
        return <PokemonMainContent 
          pokemons={pokemons.filter(checkForQuery)} 
          setQuery={setQuery} 
          query={filter?.query}
          setLetter={setLetter} 
          letter={filter?.letter}
          setType={setType} 
          type={filter?.type}
          tab={tab}
          setTab={setTab}
        />
      default:
        return <LoadingScreen />;
    }
  }
  const checkForQuery = (pkm: any) => (filter?.query == null || filter?.query == "" || pkm.name.toLowerCase().indexOf(filter?.query?.toLowerCase()) !== -1);
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {checkWhat2Render()}
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
