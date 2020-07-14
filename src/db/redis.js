const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.prot, REDIS_CONF.prot)

redisClient.on('error', (err) => {
    console.error(err)
})

const set  = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                rerurn
            }
            if (val === null) {
                resolve(val)
                rerurn
            }
            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }
        })
    })
}



module.exports {
    set,
    get
}