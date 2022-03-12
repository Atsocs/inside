import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Center, IconButton, Text, useEventListener, VStack } from '@chakra-ui/react'
import Board from './Board'
import handler from './handler'
import useGame from './useGame'
import './utils.css'

const stopPropagation = (cb) => {
  return (event, ...others) => {
    event.stopPropagation()
    cb(event, ...others)
  }
}

export default function App() {
  const game = useGame(10)
  const { board, controls } = game
  const { owner, pieces, size, activePiece, currentPiece } = board

  const eventHandler = (event) => handler(event, controls)
  useEventListener('keydown', eventHandler)
  useEventListener('click', eventHandler)
  useEventListener('contextmenu', eventHandler)

  const text = currentPiece === 0 ? '' : `Piece ${currentPiece}`
  const Controls = (
    <ButtonGroup size="lg" isAttached variant="outline" colorScheme="main">
      <IconButton onClick={stopPropagation(controls.head.prev)} _focus={{ boxShadow: 'none' }}>
        <ArrowBackIcon />
      </IconButton>
      <Button onClick={stopPropagation(controls.head.focus)} _focus={{ boxShadow: 'none' }} w={150}>
        <Text fontSize={'xl'}>{text}</Text>
      </Button>
      <IconButton onClick={stopPropagation(controls.head.next)} _focus={{ boxShadow: 'none' }}>
        <ArrowForwardIcon />
      </IconButton>
    </ButtonGroup>
  )

  return (
    <Center minW="100vw" minH="100vh" bg="main.100">
      <VStack gap={10}>
        {Controls}
        <Board
          size={size}
          owner={owner}
          pieces={pieces}
          activate={controls.activate}
          activePiece={activePiece}
          enter={controls.enter}
        />
      </VStack>
    </Center>
  )
}
