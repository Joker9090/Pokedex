import * as t from "../types";

export enum FilterTab {
  query, letter
}

export enum NETSTATUS {
  IDLE, FETCHING, FETCH, FETCH_ERROR
};

export enum POKEMON_NET_TYPE {
  ALL, LOCAL, SERVER
};

export type FilterObject = {
  type: POKEMON_NET_TYPE | POKEMON_NET_TYPE.ALL
  letter: string | ""
  query: string | ""
}

export type TStat = {
  value: number,
  name: string,
}

export type TPokemon = {
  id: number | string,
  name: string
  type: POKEMON_NET_TYPE
  image: string
  types: string[]
  abilities: string[]
  stats: TStat[]
}

export type TPokemonLight = {
  name: string
  type: POKEMON_NET_TYPE
  image: string | ""

}

export type TPokemonReducer = {
  tab: FilterTab,
  filter: FilterObject,
  pokemonsFiltered: TPokemon[],
  pokemonsServer: TPokemonLight[],
  pokemonsLocal: TPokemon[],
  pokemonsServerStatus: NETSTATUS,
  pokemonDetail: TPokemon | null,
  pokemonDetailServer: TPokemon | null,
  pokemonDetailServerStatus: NETSTATUS,
}

const PokemonReducerState: TPokemonReducer = {
  tab: FilterTab.query,
  filter: <FilterObject>{
    type: POKEMON_NET_TYPE.ALL,
    letter: "",
    query: "",
  },
  pokemonsFiltered: [],
  pokemonsServer: [],
  pokemonsLocal: [],
  pokemonsServerStatus: NETSTATUS.IDLE,
  pokemonDetail: null,
  pokemonDetailServer: null,
  pokemonDetailServerStatus: NETSTATUS.IDLE,
};

const applyFilter = (state: TPokemonReducer, filterConfig: FilterObject | null, pokemonList: TPokemonLight[]) => {
  let _filterConfig = filterConfig || state.filter;
  const pokemons: TPokemonLight[] = pokemonList.filter((p) => {
    console.log("pp",p);
    let returned = true;
    if (_filterConfig.query != "" && p.name.toLowerCase().indexOf(_filterConfig.query?.toLowerCase()) == -1) returned = false;
    if (_filterConfig.type != POKEMON_NET_TYPE.ALL && p.type != _filterConfig.type) returned = false;
    if (_filterConfig.letter != "" && p.name.toLowerCase().indexOf(_filterConfig.letter?.toLowerCase()) != 0) returned = false;
    return returned;
  });
  return {
    filter: { ..._filterConfig },
    pokemonsFiltered: [...pokemons],
  }
}

const createTPokemonLight = (pokemon: TPokemon): TPokemonLight => {
  const { name, type, image } = pokemon;
  return ({ name, type, image });
}

const main = (state = PokemonReducerState, action: any) => {
  // TODO: INPROVE TYPES HERE action.payload
  console.log("action.type", action.type, action.payload);
  switch (action.type) {
    case t.SET_TAB: 
      return {
        ...state,
          tab: action.payload,
      }
    case t.SET_QUERY:
      const filterObjectQuery = state.filter;
      filterObjectQuery.query = action.payload;
      return {
        ...state,
        filterObject: action.payload,
        ...applyFilter(state, filterObjectQuery, [...state.pokemonsServer, ...state.pokemonsLocal.map(createTPokemonLight)]),
      };
    case t.SET_LETTER:
      const filterObjectLetter = state.filter;
      filterObjectLetter.letter = action.payload;
      return {
        ...state,
        filterObject: action.payload,
        ...applyFilter(state, filterObjectLetter, [...state.pokemonsServer, ...state.pokemonsLocal.map(createTPokemonLight)]),
      };
    case t.SET_TYPE:
      const filterObjectType = state.filter;
      filterObjectType.type = action.payload;
      return {
        ...state,
        filterObject: action.payload,
        ...applyFilter(state, filterObjectType, [...state.pokemonsServer, ...state.pokemonsLocal.map(createTPokemonLight)]),
      };
    case t.POKEMON_LOCAL_ADD:
      let newValues = [...state.pokemonsLocal];
      newValues.push(action.payload);
      console.log("newValues", newValues);
      return {
        ...state,
        pokemonsLocal: newValues
      };
    case t.POKEMON_LOCAL_REMOVE_ALL:
      return {
        ...state,
        pokemonsLocal: []
      };
    case t.POKEMON_LOCAL_REMOVE:
      return {
        ...state,
        pokemonsLocal: [...state.pokemonsLocal.filter((p) => p.id != action.payload)]
      };
    case t.SET_QUERY:
      return {
        ...state,
        filter: { ...state.filter, ...{ query: action.payload } }
      };
    case t.POKEMONS_FETCH:
      const pokemonsServer = action.payload.map((p: TPokemon) => createTPokemonLight(p));
      return {
        ...state,
        pokemonsServerStatus: NETSTATUS.FETCH,
        pokemonsServer,
        ...applyFilter(state, null, [...pokemonsServer, ...state.pokemonsLocal.map(createTPokemonLight)]),
      };
    case t.POKEMONS_FETCHING:
      return {
        ...state,
        pokemonsServerStatus: NETSTATUS.FETCHING,
      };
    case t.POKEMONS_FETCH_ERROR:
      return {
        ...state,
        pokemonsServerStatus: NETSTATUS.FETCH_ERROR,
      };
    case t.POKEMON_FETCH:
      return {
        ...state,
        pokemonDetailServerStatus: NETSTATUS.FETCH,
        pokemonDetailServer: action.payload
      };
    case t.POKEMON_FETCHING:
      return {
        ...state,
        pokemonDetailServerStatus: NETSTATUS.FETCHING,
      };
    case t.POKEMON_FETCH_ERROR:
      return {
        ...state,
        pokemonDetailServerStatus: NETSTATUS.FETCH_ERROR,
      };
    case t.POKEMON_GET:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case t.POKEMONS_GET:
      return {
        ...state,
        ...applyFilter(state, null, [...state.pokemonsServer, ...state.pokemonsLocal])
      };
    default:
      return { ...state };
  }
}

export default main;