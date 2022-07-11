import imagen from '../../img/buddy-13.gif';
import './notfound.styles.css'

const NotFoundPokemon = () => {
	return (
		<div className='container-not-found'>
			<img src={imagen} alt='Not-found' className='gif'/>
			<div className="texto-not-found">
				<h1>No se encuentra pokemones de este tipo</h1>
				<p>Pruebe cargando más pokemones o escogiendo otro tipo</p>
			</div>
		</div>
	);
};

export default NotFoundPokemon;
