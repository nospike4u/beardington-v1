const redisClient = require('../redisClient');

const parseCookies = (req) => {
    const cookieHeader = req.headers.cookie || '';
    return Object.fromEntries(
        cookieHeader.split(';')
            .map(c => c.trim().split('='))
            .filter(parts => parts.length === 2)
            .map(([k, v]) => [k.trim(), v.trim()])
    );
};

const getSessionUserId = async (req) => {
    const cookies = parseCookies(req);
    const sessionId = cookies.sid;
    if (!sessionId) return null;
    const userId = await redisClient.get(`sess:${sessionId}`);
    return userId ? parseInt(userId, 10) : null;
};

module.exports = { getSessionUserId };
