/**
 * this is a simple version of 
 * there is no differense between them
 * I will use it as a global logger
 */

export function logger(req, res, next) {
    console.log(`Request...`);
    next();
};
