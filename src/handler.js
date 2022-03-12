export default function handler(event, controls) {
  event.stopPropagation()
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
        case 'ArrowUp':
          controls.move('top')
          break
        case 'd':
        case 'ArrowRight':
          controls.move('right')
          break
        case 's':
        case 'ArrowDown':
          controls.move('bottom')
          break
        case 'a':
        case 'ArrowLeft':
          controls.move('left')
          break
        default:
      }
      break
    case 'click':
      controls.activate(-1)
      break
    case 'contextmenu':
      event.preventDefault()
      break
    default:
  }
}
