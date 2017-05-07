const crypto = require('crypto');
const querystring = require('querystring');


module.exports = ssoUrl;


/*

 - query string (typically req.query with express)
 - user (typically taken from req.session or DB, formatted with the fields needed in the SSO response)
 - ssoSecret: sso secret string

 returns redirect url, can throw if sig mismatch
 */
function ssoUrl({sso, sig}, user, ssoSecret = process.env.SSO_SECRET, fields) {

	const digest = crypto.createHmac('sha256', ssoSecret).update(sso).digest('hex');

	if (digest!==sig) throw new Error('Signature mismatch');

	const {nonce, return_sso_url} =  querystring.parse(Buffer.from(sso, 'base64').toString());

	const return_payload = querystring.stringify(Object.assign(user, {nonce}));

	const return_payload_b64 = Buffer.from(return_payload).toString('base64');

	const digest2 = crypto.createHmac('sha256', ssoSecret).update(return_payload_b64).digest('hex');

	if (/^(dev|test)/.test(process.env.NODE_ENV)) {
		console.info('SSO logged in', user, ssoSecret, return_sso_url);
	}

	return return_sso_url + '?' + querystring.stringify({sso: return_payload_b64, sig: digest2});
}
