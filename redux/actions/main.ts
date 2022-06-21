import * as t from "../types";
import axios from "axios";
import { FilterObject, POKEMON_NET_TYPE, TPokemon, TPokemonLight } from "../reducers/main";

const parsePokemon = (apiResponseData: any, newType: POKEMON_NET_TYPE) => {
  let parsePokemon: TPokemon = <TPokemon>{};
  parsePokemon.name = apiResponseData.name;
  parsePokemon.type = newType;
  parsePokemon.image = apiResponseData.sprites.front_default;
  parsePokemon.types = apiResponseData.types.map((a: { type: { name: string } }) => a.type.name );
  parsePokemon.abilities = apiResponseData.abilities.map((a: { ability: { name: string } }) => a.ability.name );
  parsePokemon.stats = apiResponseData.stats.map((s: { base_stat: number, stat: { name: string } }) => ({ value: s.base_stat, name: s.stat.name }));
  return parsePokemon;
}

const parsePokemonLight = (apiResponseData: any, newType: POKEMON_NET_TYPE) => {
  const id = (newType == POKEMON_NET_TYPE.SERVER) ? Number(apiResponseData.url.match(/pokemon\/\d*/)[0].replace('pokemon/', '')) : '-'
  let parsePokemon: TPokemon = <TPokemon>{};
  parsePokemon.name = apiResponseData.name;
  parsePokemon.type = newType;
  parsePokemon.image = `${process.env.NEXT_PUBLIC_IMAGES_URI}${id}.png`;
  return parsePokemon;
}

export const setQuery = (query: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_QUERY,
    payload: query
  });
}

export const setLetter = (letter: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_LETTER,
    payload: letter
  });
}

export const setType = (type: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_TYPE,
    payload: type
  });
}

export const setTab = (tab: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_TAB,
    payload: tab
  });
}

export const hidratePokemons = () => (dispatch: any) => {
  dispatch({ type: t.POKEMONS_FETCHING });
  axios.get(`${process.env.NEXT_PUBLIC_API_URI}pokemon?limit=100000&offset=0`).then((response: any) => {
    const pokemons: TPokemonLight[] = response.data.results.map((p: TPokemon) => parsePokemonLight(p, POKEMON_NET_TYPE.SERVER));
    dispatch({
      type: t.POKEMONS_FETCH,
      payload: pokemons
    });
  }).catch((error: any) => {
    dispatch({ type: t.POKEMONS_FETCH_ERROR });
    console.error("hidratePokemons error", error);
  })
}

export const hidratePokemon = (pokeName: string) => (dispatch: any) => {
  dispatch({ type: t.POKEMON_FETCHING });
  return axios.get(`${process.env.NEXT_PUBLIC_API_URI}pokemon/${pokeName}`).then((response: any) => {
    const parsedPokemon: TPokemon = parsePokemon(response.data, POKEMON_NET_TYPE.SERVER);
    dispatch({
      type: t.POKEMON_FETCH,
      payload: parsedPokemon
    });
    return parsedPokemon;
  }).catch((error: any) => {
    dispatch({ type: t.POKEMON_FETCH_ERROR });
    console.error("hidratePokemon error", error);
    return null;
  })
}

export const createPokemonLocal = (pokemon: TPokemon) => (dispatch: any) => {
  dispatch({
    type: t.POKEMON_LOCAL_ADD,
    payload: pokemon
  });
}

export const removePokemonLocal = (pokemonId: string) => (dispatch: any) => {
  dispatch({
    type: t.POKEMON_LOCAL_REMOVE,
    payload: pokemonId
  });
}

export const getPokemons = (filter: FilterObject) => (dispatch: any) => {
  dispatch({ type: t.POKEMONS_GET, payload: filter });
}

export const getPokemon = (name: string) => async (dispatch: any, getState: any) => {
  const pokemonsLocal: TPokemon[] = getState().main.pokemonsLocal;
  let pokemon = pokemonsLocal.filter((p: TPokemon) => p.name === name);
  if (pokemon.length) dispatch({ type: t.POKEMON_GET, payload: pokemon[0] });
  else {
    pokemon = await dispatch(hidratePokemon(name));
    if (pokemon) dispatch({ type: t.POKEMON_GET, payload: pokemon });
  }
}