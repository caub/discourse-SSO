const crypto = require('crypto');
const querystring = require('querystring');


module.exports = ssoRedirectUrl;


/*

 - query string (typically req.query with express)
 - user (typically taken from req.session or DB)
 - ssoSecret: sso secret string

 returns redirect url, can throw if sig mismatch
 */
function ssoRedirectUrl({sso, sig}, user, ssoSecret = process.env.SSO_SECRET) {

	const digest = crypto.createHmac('sha256', ssoSecret).update(sso).digest('hex');

	if (digest!==sig) throw new Error('Signature mismatch');

	const {nonce, return_sso_url} =  querystring.parse(Buffer.from(sso, 'base64').toString());
	const return_payload = querystring.stringify({
		nonce, 
		email: user.email, 
		external_id: user._id, 
		require_activation: true, 
		name: user.name, 
		admin: Boolean(user.admin && user.admin.user)
	});

	const return_payload_b64 = Buffer.from(return_payload).toString('base64');

	const digest2 = crypto.createHmac('sha256', ssoSecret).update(return_payload_b64).digest('hex');

	return return_sso_url + '?' + querystring.stringify({sso: return_payload_b64, sig: digest2});
}



