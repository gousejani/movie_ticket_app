module.exports = function (row, column) {
	var array = new Array();
	for (var i = 0; i < row; i++) {
		array.push(new Array(column).fill(true));
	}
	return array;
};
