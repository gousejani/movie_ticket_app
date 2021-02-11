export const arrayToCode = (col, rowIndex, colIndex) => {
	return rowIndex * col + colIndex + 1;
};

export const codeToArray = (col, code) => {
	let array = [];
	array.push(Math.floor((code - 1) / col));
	array.push((code - 1) % col);
	return array;
};

export const codeArrayToArray = (col, code) => {
	var ticketArray = [];
	for (let i = 0; i < code.length; i++) {
		let array = [];
		array.push(Math.floor((code[i] - 1) / col));
		array.push((code[i] - 1) % col);
		ticketArray.push(array);
	}
	return ticketArray;
};

export const arrayToAlphaCode = (rowIndex, colIndex) => {
	return String.fromCharCode(65 + rowIndex) + (colIndex + 1).toString();
};
export const alphaCodeToArray = (alpha) => {
	return [alpha.charCodeAt(0) - 65, parseInt(alpha.slice(1))];
};

export const ticketstoAlphaCodeArray = (tickets) => {
	var seats = [];
	for (let i = 0; i < tickets.length; i++) {
		seats.push(
			String.fromCharCode(65 + tickets[i][0]) + (tickets[i][1] + 1).toString()
		);
	}
	return seats;
};
export const alphaCodeArrayToArray = (alpha) => {
	var ticketArray = [];
	for (let i = 0; i < alpha.length; i++) {
		ticketArray.push([
			alpha[i].charCodeAt(0) - 65,
			parseInt(alpha[i].slice(1)) - 1,
		]);
	}
	return ticketArray;
};
