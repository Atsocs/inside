import { Center, Spacer, Text, useEventListener, VStack } from '@chakra-ui/react'
import Board from './Board'
import handler from './handler'
import useGame from './useGame'
import './utils.css'

export default function App() {
  const game = useGame(10)
  const { board, controls } = game
  const { owner, pieces, size, activePiece, currentPiece } = board

  useEventListener('keydown', (e) => handler(e, controls))

  return (
    <Center w="100vw" h="100vh" bg="yellow.100">
      <VStack gap={10}>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Piece {currentPiece}
        </Text>
        <Board size={size} owner={owner} pieces={pieces} activate={controls.activate} activePiece={activePiece} />
      </VStack>
    </Center>
  )
}
