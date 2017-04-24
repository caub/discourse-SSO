const querystring = require('querystring');
const assert = require('assert');
const {URL} = require('url');
const sso = require('../');


const query = querystring.parse('sso=cmV0dXJuX3Nzb191cmw9aHR0cHMlM0ElMkYlMkZpLmolMkZrJm5vbmNlPTEyM2Fk&sig=f5206e62698e73cc868443c5bfe6c725d1edcc18889b44bd66f688e96e58cd79');


try {

	const urlStr = sso(query, {name: 'Joe', _id: '1', email:'joe@gmail.com'}, 'foo bar qux');

	const url = new URL(urlStr);

	assert(url.searchParams.has('sso'));
	assert(url.searchParams.has('sig'));

	assert.equal(url.hostname, 'i.j');

} catch(e) {
	console.error(e)
}

try {

	const urlStr = sso(query, {name: 'Joe', _id: '1', email:'joe@gmail.com'}, 'foo bar qux bad secret');

} catch(e) {
	assert(e.message)
}



