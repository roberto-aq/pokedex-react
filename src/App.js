import { useEffect, useState } from 'react';
import './App.css';
import CardPokemon from './components/card-pokemon/card.component';
import NotFoundPokemon from './components/NotFound/NotFoundPokemon';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
	const [allPokemons, setAllPokemons] = useState([]);
	const [loadMore, setLoadMore] = useState(
		'https://pokeapi.co/api/v2/pokemon?limit=20'
	);
	const [searchField, setSearchField] = useState('');
	const [filteredPokemons, setFilteredPokemons] = useState(allPokemons);
	const [allTypesPokemons, setAllTypesPokemons] = useState([]);
	const [activeType, setActiveType] = useState('All');

	const getAllPokemons = async () => {
		const res = await fetch(loadMore);
		const data = await res.json();

		setLoadMore(data.next);

		const createPokemonObject = results => {
			results.forEach(async pokemon => {
				const res = await fetch(`${pokemon.url}`);
				const data = await res.json();

				setAllPokemons(currentList => [...currentList, data]);
			});
		};

		createPokemonObject(data.results);
	};

	const getAllTypes = async () => {
		const res = await fetch('https://pokeapi.co/api/v2/type');
		const data = await res.json();

		const types = data.results;
		console.log(types);
		setAllTypesPokemons(types);
	};

	useEffect(() => {
		getAllPokemons();
		getAllTypes();
	}, []);

	useEffect(() => {
		const newFilteredPokemons = allPokemons.filter(pokemon => {
			return pokemon.name.toLowerCase().includes(searchField);
		});

		setFilteredPokemons(newFilteredPokemons);
	}, [allPokemons, searchField]);

	useEffect(() => {
		if (activeType === 'All') {
			setFilteredPokemons(allPokemons);
			return;
		}

		const filteredTypePokemon = allPokemons.filter(pokemon =>
			pokemon.types[0].type.name.includes(activeType)
		);
		setFilteredPokemons(filteredTypePokemon);
	}, [activeType]);

	const onSearchChange = e => {
		const searchFieldString = e.target.value.toLowerCase();

		setSearchField(searchFieldString);
		setActiveType('All');
	};

	return (
		<>
			<div className='logo-container'>	
				<img
					className='logo'
					src='https://raw.githubusercontent.com/LeeonardoVargas/pokedex/master/.github/logo.svg'
					alt='Logo'
				/>
			</div>
			<SearchBox
				onSearchChange={onSearchChange}
				placeholder='Buscar Pokemons'
				className='search-box-pokemons'
			/>
			<div className='container'>
				<aside>
					<button
						className={`btn-type ${activeType === 'All' ? 'active' : ''}`}
						onClick={() => setActiveType('All')}
					>
						All
					</button>
					{allTypesPokemons.map((type, i) => {
						return (
							<button
								className={`btn-type ${
									activeType === type.name ? 'active' : ''
								}`}
								key={i}
								onClick={() => setActiveType(type.name)}
							>
								{type.name}
							</button>
						);
					})}
				</aside>

				{!filteredPokemons.length ? (
					<NotFoundPokemon />
				) : (
					<div className='card-list-pokemon'>
						{filteredPokemons.map((pokemon, i) => {
							return (
								<CardPokemon
									id={pokemon.id}
									name={pokemon.name}
									image={pokemon.sprites.other.dream_world.front_default}
									type={pokemon.types[0].type.name}
									key={i}
								/>
							);
						})}
					</div>
				)}
			</div>
			<div className='button-container'>
				<button className='load-more' onClick={getAllPokemons}>
					Cargar más
				</button>
			</div>
		</>
	);
};

export default App;
