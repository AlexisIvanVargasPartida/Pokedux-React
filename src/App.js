import { useEffect } from "react";
import { Col, Spin } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Searcher from "./components/Searcher";
import PokemonList from "./components/PokemonList";
import { fetchPokemonWithDetails } from "./slices/dataSlice";
import logo from "./statics/logo.svg";
import "./App.css";

function App() {
  const pokemons = useSelector(
    (state) =>
      // getIn(state, ["data", "pokemons"], shallowEqual)
      state.data.pokemonsFiltered,
    shallowEqual
  );

  const loading = useSelector(
    (state) =>
      // // getIn(state, ["ui", "loading"]));
      state.ui.loading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonWithDetails());
  }, []);

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt="Pokedux" />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading ? (
        <Col offset={12}>
          <Spin spinning size="large" />
        </Col>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </div>
  );
}

export default App;