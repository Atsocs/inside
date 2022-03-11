import { Center, SimpleGrid, Square } from '@chakra-ui/react'

const colors = {
  0: 'blue.200',
  1: 'red.200',
}
export default function Board({ size = 3, owner, pieces = [] }) {
  return (
    <Square size="xl">
      <SimpleGrid
        columns={size}
        w="100%"
        h="100%"
        borderWidth={20}
        borderStyle="ridge"
        borderColor={colors[owner]}
        boxShadow="xl"
      >
        {[...Array(size * size).keys()].map((index) => (
          <Cell key={index} index={index}>
            <Piece owner={pieces[index]} />
          </Cell>
        ))}
      </SimpleGrid>
    </Square>
  )
}

function Cell({ index, children }) {
  return <Center bg={index % 2 === 1 ? 'black' : 'white'}>{children}</Center>
}

function Piece({ owner }) {
  return <Square w="50%" h="50%" bg={colors[owner]} borderRadius="full"></Square>
}
