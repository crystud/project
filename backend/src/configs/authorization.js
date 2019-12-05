module.exports = {
  password: {
    minLength: process.env.PASSWORD_MIN_SIZE || 8,
    hashSize: process.env.PASSWORD_HASH_SIZE || 10,
  },
  token: {
    access: {
      secret: process.env.TOKEN_SECRET || 'tokenSecret',
      time: process.env.TOKEN_TIME || 20,
    },
  },
}
