const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // disable the `X-RateLimit-*` headers
    message: 'You can only make 100 requests per 15 minutes.',
    statusCode:429,
    keyGenerator: (request, response) => request.ip,
		
	
})

module.exports = limiter