const querystring = require('querystring');
const sso = require('../');

const query = querystring.parse('sso=bm9uY2U9NmJjNzcwNWVmNTQyN2E4MjY0MDM4YjVjMTI5MTQwYzMmcmV0dXJu%0AX3Nzb191cmw9aHR0cCUzQSUyRiUyRmRpc2N1c3MuZGVzaWduZXIuaW8lMkZz%0AZXNzaW9uJTJGc3NvX2xvZ2lu%0A&sig=e8b5960dd50dede65df152499565b22af8bde822d10250e7214089d3384e37e5');

console.log(query);
try {

	console.log(sso(query, {name: 'Joe', _id: '1', email:'joe@gmail.com'}, '__secret__'))

} catch(e) {console.error(e)}


