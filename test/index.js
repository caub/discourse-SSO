const querystring = require('querystring');
const sso = require('../');

const query = querystring.parse('sso=bm9uY2U9NWIyNGFhZjVlNWFiMjZlOTg4ODQ3YTg3OTgyZjBkMTMmcmV0dXJu%0AX3Nzb191cmw9aHR0cCUzQSUyRiUyRmRpc2N1c3MuZGVzaWduZXIuaW8lMkZz%0AZXNzaW9uJTJGc3NvX2xvZ2lu%0A&sig=04cfb4d8c6448014d31e8c0dba761c1e0308498bc76066a0e77bf66039ee7cfc');

console.log(query);
try {

	console.log(sso(query, {name: 'Joe', _id: '1', email:'joe@gmail.com'}, '__secret__'))

} catch(e) {
	console.error(e)
}


