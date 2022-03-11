export default function handler(event, controls) {
  const { type, key } = event
  switch (type) {
    case 'keydown':
      switch (key) {
        // Camera
        case '[':
          controls.head.prev()
          break
        case ']':
          controls.head.next()
          break
        // Movement
        case 'w':
          console.log('top')
          break
        case 'd':
          console.log('right')
          break
        case 's':
          console.log('bottom')
          break
        case 'a':
          console.log('left')
          break
        default:
      }
      break
    default:
  }
}
