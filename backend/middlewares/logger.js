const logger = async (req, res, next) => {
  const { ip, method, url } = req

  console.log(`${new Date().toISOString()} [${ip}] ${method} ${url}`)

  next()
}

module.exports = logger
