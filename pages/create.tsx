import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { connect } from "react-redux"
import { createPokemonLocal, getPokemons } from "../redux/actions/main"
import { TPokemonReducer } from '../redux/reducers/main'
import Header from '../components/globals/Header'
import { PokemonDetailContent } from '../components/PokemonDetailContent';

export type CreateProps = {
  children: React.ReactElement,
  createPokemonLocal: any,
}

const mapStateToProps = (state: any) => {
  const main: TPokemonReducer = state.main;
  return {
    tab: main.tab,
  }
}

const mapDispatchToProps = {
  createPokemonLocal,
  getPokemons,
}

const Home = (props: CreateProps) => {
  const { createPokemonLocal } = props;

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <PokemonDetailContent pokemon={null} createPokemonLocal={createPokemonLocal} />
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
