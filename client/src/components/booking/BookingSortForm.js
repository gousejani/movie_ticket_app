import React from 'react';

export const BookingSortForm = () => {
	return (
		<div class="sort-container">
			<label for="cars">Sort by</label>
			<select name="cars" id="cars">
				<option value="movie" selected="selected">
					Movie Date
				</option>
				<option value="booking">Booking Date</option>
			</select>
		</div>
	);
};
