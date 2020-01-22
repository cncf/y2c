export default {
  set: (args) => {
    const keys = Object.keys(args)
    keys.forEach((key) => {
      if (args[key] === undefined || args[key] === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, args[key])
      }
    })
  },
  get: (...keys) => {
    let values = {}
    keys.forEach((key) => values[key] = localStorage[key])
    return values
  }
}
