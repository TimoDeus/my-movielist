import React from 'react';
import {Dropdown} from 'semantic-ui-react'

const sortOptions = [
	{key: 'byName', value: 'byName', text: 'Titel'},
	{key: 'byRating', value: 'byRating', text: 'Bewertung'}
];

const Sorter = () => (
	<Dropdown placeholder='State' search selection options={sortOptions} value={'byName'} />
);

export default Sorter;

