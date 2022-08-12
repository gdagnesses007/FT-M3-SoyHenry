'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var chalk = require('chalk');

var utils = {};

/**
 * Writes a file asynchronously
 * 
 * @param {string} filename The name of the file  
 * @param {string} text The text to be saved
 * @param {function} callback A function to handle the responses (error, data). 
 * 								If success, data is set to true.
 */
utils.writeFile = (filename, text, callback) => {
	let randExtraTime = Math.random() * 200;
	setTimeout(() => {
		fs.writeFile(filename, text, 'utf8', error => {
			if (error) {
				callback({ error })
			} else {
				callback({ data: true })
			}
		})
	}, randExtraTime);
}

utils.readFile = function (filename, callback) {
	var randExtraTime = Math.random() * 200;
	setTimeout(function () {
		fs.readFile(filename, function (err, buffer) {
			if (err) callback(err);
			else callback(null, buffer.toString());
		});
	}, randExtraTime);
};

utils.promisifiedReadFile = function (filename) {
	return new Promise(function (resolve, reject) {
		utils.readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

utils.blue = function (text) {
	console.log(chalk.blue(text));
};

utils.magenta = function (text) {
	console.error(chalk.magenta(text));
};

module.exports = utils;
