import React from 'react';

const CardPokemon = ({ id, name, image, type }) => {
	return (
		<div className='card-pokemon'>
			<div className='img-card-container'>
				<img src={image} alt={name} />
			</div>
			<div className='number'>
				<span>N.°{id}</span>
			</div>
			<div className='detail-wrapper'>
				<h3>{name}</h3>
				<span className={type}>{type}</span>
			</div>
		</div>
	);
};

export default CardPokemon;
