import { Center, Circle, SimpleGrid } from '@chakra-ui/react'
import { colors } from './theme'

const boxShadow1 =
  'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
const boxShadow2 =
  'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'

export default function Board({ board, controls }) {
  const {
    pieces,
    activePiece,
    head: { owner },
    size,
  } = board
  const { activate, enter } = controls

  const isActive = activePiece === -1

  const handleClick = (event, index) => {
    event.preventDefault()
    event.stopPropagation()
    if (index === undefined) return
    const eventMap = { click: activate, contextmenu: enter }
    eventMap[event.type](index)
  }

  const color = colors[owner] + '.500'
  const borderRadius = 'full'

  return (
    <Circle
      size="xl"
      color={color}
      boxShadow={boxShadow1}
      borderWidth={20}
      borderStyle="solid"
      borderColor="currentcolor"
      cursor="auto"
      onClick={(e) => handleClick(e)}
      onContextMenu={(e) => handleClick(e)}
      bgColor="main.600"
      borderRadius={borderRadius}
      outlineOffset={5}
      outline={isActive ? '2px dashed' : undefined}
    >
      <SimpleGrid columns={size} spacing={1} w="100%" h="100%" borderRadius={borderRadius} className="masked">
        {[...Array(size * size).keys()].map((index) => (
          <Cell key={index} isInside={pieces[index].inside}>
            <Piece
              owner={pieces[index]?.owner}
              onRightClick={(e) => handleClick(e, index)}
              onClick={(e) => handleClick(e, index)}
              isActive={index === activePiece}
            />
          </Cell>
        ))}
      </SimpleGrid>
    </Circle>
  )
}

function Cell({ children, isInside }) {
  const bg = 'main' + (isInside ? '.300' : '.100')
  return <Center bg={bg}>{children}</Center>
}

function Piece({ owner, onClick, onRightClick, isActive }) {
  if (owner === undefined) return null
  const color = colors[owner] + '.400'
  const w = '80%'
  return (
    <Circle
      color={color}
      boxShadow={boxShadow2}
      w={w}
      h={w}
      bg={color}
      onClick={onClick}
      onContextMenu={onRightClick}
      cursor="pointer"
      outlineOffset={5}
      outline={isActive ? '2px dashed' : undefined}
    />
  )
}
