import { Center, Circle, SimpleGrid, Square } from '@chakra-ui/react'

const colors = {
  0: 'blue.200',
  1: 'red.200',
}

const activeEffect = '0 0 40px 10px gold'
export default function Board({ size = 3, owner, pieces = [], activate, activePiece }) {
  return (
    <Circle
      size="xl"
      boxShadow={activePiece !== -1 ? 'xl' : activeEffect}
      borderWidth={20}
      borderStyle="solid"
      borderColor={colors[owner]}
    >
      <SimpleGrid columns={size} w="100%" h="100%" borderRadius={'full'} className="masked">
        {[...Array(size * size).keys()].map((index) => (
          <Cell key={index} index={index}>
            <Piece owner={pieces[index]} onClick={() => activate(index)} active={index === activePiece} />
          </Cell>
        ))}
      </SimpleGrid>
    </Circle>
  )
}

function Cell({ index, children }) {
  return <Center bg={index % 2 === 1 ? 'black' : 'white'}>{children}</Center>
}

function Piece({ owner, onClick, active }) {
  const color = colors[owner]
  if (!color) return null
  const boxShadow = active ? activeEffect : undefined
  return <Circle boxShadow={boxShadow} w="50%" h="50%" bg={color} onClick={onClick} />
}
