import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from "react-redux"
import { hidratePokemon, getPokemon } from "../redux/actions/main"
import { FilterObject, NETSTATUS, TPokemon, TPokemonReducer } from '../redux/reducers/main'
import Header from '../components/globals/Header'
import { LoadingScreen } from '../components/globals/Loading'
import { ErrorScreen } from '../components/globals/Error'
import { PokemonDetailContent } from '../components/PokemonDetailContent'

export type DetailProps = {
  children: React.ReactElement,
  getPokemon: any,
  hidratePokemon: any,
  pokemon: TPokemon | null,
  pokemonDetailServerStatus: NETSTATUS,
  filter: FilterObject | null
}

const mapStateToProps = (state: any) => {
  const main: TPokemonReducer = state.main;
  return {
    filter: main.filter,
    pokemon: main.pokemonDetail,
    pokemonDetailServerStatus: main.pokemonDetailServerStatus
  }
}

const mapDispatchToProps = {
  getPokemon,
  hidratePokemon
}

const Detail = (props: DetailProps) => {
  const router = useRouter();
  const { name } = router.query;
  const { pokemonDetailServerStatus, pokemon, getPokemon } = props;

  useEffect(() => {
    if (name && name.length){
      getPokemon(name[0]);
    } 
  }, [name]);
  const checkWhat2Render = () => {
    switch (true) {
      case (pokemonDetailServerStatus == NETSTATUS.FETCHING):
        return <LoadingScreen />;
      case (pokemon == null && pokemonDetailServerStatus == NETSTATUS.FETCH):
        return <ErrorScreen />;
      case (pokemonDetailServerStatus == NETSTATUS.FETCH_ERROR):
        return <ErrorScreen />;
      case (pokemon != null || pokemonDetailServerStatus == NETSTATUS.FETCH):
        return <PokemonDetailContent pokemon={pokemon} />
      default:
        return <LoadingScreen />;
    }
  }
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {checkWhat2Render()}
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
