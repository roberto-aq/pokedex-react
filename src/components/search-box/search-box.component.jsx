import React from 'react';
import './search-box.styles.css';
import { HiSearch } from "react-icons/hi";

const SearchBox = ({ onSearchChange, placeholder, className }) => {
	return (
		<div className='search-container'>
			<div>
				<HiSearch className='icon'/>
			</div>
			<input
				className={`search-box ${className}`}
				type='search'
				placeholder={placeholder}
				onChange={onSearchChange}
			/>
		</div>
	);
};

export default SearchBox;
