import React from 'react';
import { FilterTab, POKEMON_NET_TYPE } from '../redux/reducers/main';
import styles from '../styles/PokemonFilterInput.module.css'
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import Glide from "@glidejs/glide";

export const PokemonFilter = ({ query, setQuery, letter, setLetter, tab, setTab, type, setType }: any) => {
  const CheckWhatToRender = () => {
    switch (tab) {
      case FilterTab.query:
        return <PokemonFilterQuery query={query} setQuery={setQuery} />
      case FilterTab.letter:
        return <PokemonFilterLetter letter={letter} setLetter={setLetter} />
      default:
        return <PokemonFilterQuery query={query} setQuery={setQuery} />
    }
  }
  return (
    <div className={styles.PokemonFilter}>
      <p className={styles.PokemonFilterTitle}>Search For a pokemon:</p>
      <div className={styles.PokemonFilterBox}>
        <div className={styles.PokemonFilterSeparatorA}>
          <div className={styles.PokemonFilterSelectorBox}>
            <div
              className={tab == FilterTab.query ? styles.PokemonFilterSelectorBoxItemActive : styles.PokemonFilterSelectorBoxItem}
              onClick={() => {
                setTab(FilterTab.query);
                setLetter("");
              }}>
              Q
            </div>
            <div
              className={tab == FilterTab.letter ? styles.PokemonFilterSelectorBoxItemActive : styles.PokemonFilterSelectorBoxItem}
              onClick={() => {
                setTab(FilterTab.letter);
                setQuery("");
              }}>
              L
            </div>
          </div>
          <div className={styles.PokemonFilterSelectorOption}>
            {CheckWhatToRender()}
          </div>
        </div>
        <div className={styles.PokemonFilterSeparatorB}>
          <PokemonFilterType type={type} setType={setType} />
        </div>
      </div>
    </div>
  )
}

const sliderConfiguration = {
  type: "carousel",
  startAt: 0,
  animationTimingFunc: "ease-in-out",
  perView: 7,
  gap: 0,
};

export const PokemonFilterLetter = ({ letter, setLetter }: any) => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const reference = React.useRef(null);
  // TODO: IMPROVE GLide Style connectors and fix ignore hotfixes
  React.useEffect(() => {
    // @ts-ignore
    const slider = new Glide(reference.current, sliderConfiguration);
    slider.mount();
    return () => {
      // @ts-ignore
      slider.destroy();
      // setLetter("");
    };
  }, [reference]);

  return (
    <div className={styles.PokemonFilterLetter}>
      <div ref={reference} className=" collection__glide glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {letters.map((l, index) => (
              <div className={`glide__slide ${l == letter ? styles.PokemonFilterLetterItemActive : styles.PokemonFilterLetterItem}`} key={index} onClick={() => setLetter(l)}>
                <p>{l}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export const PokemonFilterQuery = ({ query, setQuery }: any) => {
  React.useEffect(() => {
    return () => {
      // setQuery("");
    };
  }, []);
  return (
    <div className={styles.PokemonFilterQuery}>
      <label>Search</label>
      <input
        data-cy-test="cy-PokemonFilterQuery-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}>
      </input>
    </div>
  )
}

export const PokemonFilterType = ({ type, setType }: any) => {
  return (
    <div className={styles.PokemonFilterType}>
      <div className={type == POKEMON_NET_TYPE.LOCAL ? styles.PokemonFilterTypeItemActive : styles.PokemonFilterTypeItem} onClick={() => setType(POKEMON_NET_TYPE.LOCAL)}>Local</div>
      <div className={type == POKEMON_NET_TYPE.SERVER ? styles.PokemonFilterTypeItemActive : styles.PokemonFilterTypeItem} onClick={() => setType(POKEMON_NET_TYPE.SERVER)}>Server</div>
      <div className={type == POKEMON_NET_TYPE.ALL ? styles.PokemonFilterTypeItemActive : styles.PokemonFilterTypeItem} onClick={() => setType(POKEMON_NET_TYPE.ALL)}>All</div>

    </div>
  )
}




export default PokemonFilter;