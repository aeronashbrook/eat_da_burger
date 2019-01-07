var connection = require('../config/connection.js');

// build query
function printQuestionMarks(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push('?');
	};
	return arr.toString();
};
// part 2 **
function objToSql(ob) {
	var arr = [];
	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		};
	};
	return arr.toString();
};

var orm = {
	//  function for getting everything from db
	selectAll: function(tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function(err, result) {
            if (err) throw err;
            // send result back to callback function
			cb(result);
		});
	},
	// function for inserting new burger into db
	insertOne: function(table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;
		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';
		console.log(queryString);
		console.log(vals);
		connection.query(queryString, vals, function(err, result) {
			if (err) throw err;
			
			cb(result);
		});
	}
};
module.exports = orm;