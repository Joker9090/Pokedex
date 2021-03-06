import React from 'react';
import { useRouter } from 'next/router'
import Link from "next/link";
import { POKEMON_NET_TYPE, TPokemon, TStat } from '../redux/reducers/main';
import styles from '../styles/DetailContent.module.css';
import { PokemonsAddLocalBtnConnected } from './PokemonsAddLocalBtn';

export const PokemonDetailContent = ({ pokemon, createPokemonLocal, removePokemonLocal }: { pokemon: TPokemon | null, createPokemonLocal: any | null, removePokemonLocal: any | null }) => {
  const router = useRouter();
  const [localPokemonData, setLocalPokemonData] = React.useState<TPokemon>({
    id: "Local-",
    name: "new-pokemon",
    type: POKEMON_NET_TYPE.LOCAL,
    image: "/images/pokeball.png",
    stats: [],
    types: [],
    abilities: []
  });

  const createPokemon = () => {
    if (createPokemonLocal) {
      createPokemonLocal(localPokemonData);
      router.push("/");
    };
  }
  const removePokemon = () => {
    if (removePokemonLocal) {
      removePokemonLocal(pokemon?.id);
      router.push("/");
    };
  }
  return (
    <div className={styles.PokemonDetailContent}>
      <div className={`${styles.PokemonDetailContentImageBox} ${!pokemon ? styles.overflowHidden : ''}`}>
        <div className={styles.PokemonDetailContentNavBar}>
          <Link href={`/`}>
            <span className="icon-arrow-left2" data-cy-test={`cy-PokemonDetailContent-back`}/>
          </Link>
        </div>
        {pokemon ? (
          <img src={pokemon.image} alt={pokemon.name} />
        ) : (
          <img src={localPokemonData.image} alt={"new-pokemon"} />
        )}
      </div>
      {pokemon ? (
        <div className={styles.PokemonDetailContentFormShow}>
          <PropertyItem label={"Name"} value={pokemon.name} />
          {pokemon.stats.map((p) => (
            <PropertyItem key={`stat-${p.name}`} label={p.name} value={p.value.toString()} />
          ))}
          <PropertyItem label={"Types"} value={pokemon.types.join(",")} />
          <PropertyItem label={"Abilities"} value={pokemon.abilities.join(",")} />
          {(pokemon.type == POKEMON_NET_TYPE.LOCAL && removePokemonLocal && (
            <PokemonsAddLocalBtnConnected value={`Remove ${pokemon.name}`} onClick={removePokemon} />
          ))}
        </div>
      ) : (
        <div className={styles.PokemonDetailContentFormCreate}>
          <CreatePokemonForm
            onClick={createPokemon}
            localPokemonData={localPokemonData}
            setLocalPokemonData={setLocalPokemonData}
          />
        </div>
      )}
    </div>
  )
}

export const CreatePokemonForm = ({ onClick, localPokemonData, setLocalPokemonData }: { onClick: any, localPokemonData: TPokemon, setLocalPokemonData: any }) => {

  const changeNameProperty = (value: string) => {
    setLocalPokemonData({
      ...localPokemonData,
      name: value,
      id: `Local-${value}`,
    });
  }

  const changeTypeProperty = (value: []) => {
    setLocalPokemonData({
      ...localPokemonData,
      types: value,
    });
  }

  const changeAbilityProperty = (value: []) => {
    setLocalPokemonData({
      ...localPokemonData,
      abilities: value,
    });
  }
  const changeStatsProperty = (value: []) => {
    setLocalPokemonData({
      ...localPokemonData,
      stats: value,
    });
  }

  return (
    <div className={styles.CreatePokemonForm}>
      <PropertyItemCreateName label={"Name"} value={localPokemonData.name} onChange={changeNameProperty} />
      <PropertyItemCreateList label={"Abilities"} key="abilities" value={localPokemonData.abilities} onChange={changeAbilityProperty} />
      <PropertyItemCreateList label={"Types"} key="types" value={localPokemonData.types} onChange={changeTypeProperty} />
      <PropertyItemCreateStatsList label={"Stats"} key="stats" value={localPokemonData.stats} onChange={changeStatsProperty} />

      <PokemonsAddLocalBtnConnected value={"Create"} onClick={onClick} />
    </div>
  )
}


export const PropertyItemCreateStatsList = ({ label, value, onChange }: { label: string, value: TStat[], onChange: any }) => {
  const changeIndexed = (i: number, v: TStat) => {
    let newValues = [...value];
    newValues[i] = v;
    onChange([...newValues])
  }
  const addNewItem = () => {
    let newValues = [...value];
    newValues.push({ value: 0, name: `new-${label}` });
    onChange([...newValues]);
  }
  const removeNewItem = (i: number) => {
    let newValues = [...value].filter((v, index) => index != i);
    onChange([...newValues]);
  }
  return (
    <div className={styles.PropertyItemCreate}>
      <label className={styles.PropertyItemKey}>{label}</label>
      <div className={styles.PropertyItemCreateList}>
        {value.map((v, index) => (
          <div key={`v-${label}-${index}`} className={styles.PropertyItemCreateListItem} data-cy-test={`cy-PropertyItemCreateStatsList`}>
            <input
              className={styles.PropertyItemValueCreate}
              type="text"
              value={v.name}
              onChange={(e) => changeIndexed(index, { name: e.target.value, value: v.value })}>
            </input>
            <input
              className={styles.PropertyItemValueCreate}
              type="number"
              value={v.value}
              onChange={(e) => changeIndexed(index, { value: Number(e.target.value), name: v.name })}>
            </input>
            <div className={styles.PropertyRemoveListItem} onClick={() => removeNewItem(index)}><span className="icon-minus" /></div>
          </div>
        ))}
        <div className={styles.PropertyAddListItem} onClick={addNewItem}><span className="icon-plus" data-cy-test={`cy-PropertyItemCreateStatsList-add`} /></div>
      </div>

    </div>
  )
}

export const PropertyItemCreateList = ({ label, value, onChange }: { label: string, value: string[], onChange: any }) => {
  const changeIndexed = (i: number, v: string) => {
    let newValues = [...value];
    newValues[i] = v;
    onChange([...newValues])
  }
  const addNewItem = () => {
    let newValues = [...value];
    newValues.push(`new-${label}`);
    onChange([...newValues])
  }
  const removeNewItem = (i: number) => {
    let newValues = [...value].filter((v, index) => index != i);
    onChange([...newValues]);
  }
  return (
    <div className={styles.PropertyItemCreate}>
      <label className={styles.PropertyItemKey}>{label}</label>
      <div className={styles.PropertyItemCreateList} data-cy-test={`cy-PropertyItemCreateList-${label}`}>
        {value.map((v, index) => (
          <div key={`v-${label}-${index}`} className={styles.PropertyItemCreateListItem}>
            <input
              className={styles.PropertyItemValueCreate}
              type="text"
              value={v}
              onChange={(e) => changeIndexed(index, e.target.value)}>
            </input>
            <div className={styles.PropertyRemoveListItem} onClick={() => removeNewItem(index)}><span className="icon-minus" /></div>
          </div>
        ))}
        <div className={styles.PropertyAddListItem} onClick={addNewItem}><span className="icon-plus" data-cy-test={`cy-PropertyItemCreateList-${label}-add`} /></div>
      </div>
    </div>
  )
}

export const PropertyItemCreateName = ({ label, value, onChange }: { label: string, value: string, onChange: any }) => {
  return (
    <div className={styles.PropertyItemCreate}>
      <label className={styles.PropertyItemKey}>{label}</label>
      <input
        className={styles.PropertyItemValueCreate}
        type="text"
        value={value}
        data-cy-test={`cy-PropertyItemCreateName`}
        onChange={(e) => onChange(e.target.value)}>
      </input>
    </div>
  )
}

export const PropertyItem = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className={styles.PropertyItem}>
      <div className={styles.PropertyItemKey}><p>{label}</p></div>
      <div className={styles.PropertyItemValue}><p data-cy-test={`cy-PropertyItem-${label}`}>{value}</p></div>
    </div>
  )
}
export default PokemonDetailContent;