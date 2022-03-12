import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Center, IconButton, Text, useEventListener, VStack, chakra } from '@chakra-ui/react'
import Board from './Board'
import handler from './handler'
import useGame from './useGame'
import { colors } from './theme'
import { stopPropagation } from './utils'
import './utils.css'

export default function App() {
  const game = useGame(10)
  const { board, controls } = game
  const { active, head } = board

  const eventHandler = (event) => handler(event, controls)
  useEventListener('keydown', eventHandler)
  useEventListener('click', eventHandler)
  useEventListener('contextmenu', eventHandler)

  const textIntensity = '.500'
  const Title = (
    <Button disabled _disabled={{ cursor: 'auto' }} _focus={{ boxShadow: 'none' }}>
      <Text fontSize={'lg'} color="black">
        <chakra.span color={colors[active.owner] + textIntensity}>{'Piece ' + active.index}</chakra.span>
        <chakra.span> inside </chakra.span>
        <chakra.span color={colors[head.owner] + textIntensity}>{'Piece ' + head.index}</chakra.span>
      </Text>
    </Button>
  )

  const Controls = (
    <ButtonGroup size="lg" isAttached variant="outline" colorScheme="main">
      <IconButton onClick={stopPropagation(controls.prev)} _focus={{ boxShadow: 'none' }}>
        <ArrowBackIcon />
      </IconButton>
      {Title}
      <IconButton onClick={stopPropagation(controls.next)} _focus={{ boxShadow: 'none' }}>
        <ArrowForwardIcon />
      </IconButton>
    </ButtonGroup>
  )

  return (
    <Center minW="100vw" minH="100vh" bg="main.100" cursor="pointer">
      <VStack gap={10}>
        {Controls}
        <Board board={board} controls={controls} />
      </VStack>
    </Center>
  )
}
