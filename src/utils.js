export const stopPropagation = (cb) => {
  return (event, ...others) => {
    event.stopPropagation()
    cb(event, ...others)
  }
}
