import React from 'react'
import styled from 'styled-components'
import Container from '../../Container'
import Note from '../../Note' 
import Ref from '../../Ref' 

const BottomBar = styled.div`
  box-shadow: 0 5px #BBB;
  padding-top: 5px;
  background: white;
  position: fixed;
  height: 165px;
  bottom: ${({ visible }) => visible ? 0 : -165}px;
  left: 0;
  right: 0;
  transition: bottom .3s ease;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
`

const ListElem = styled.li`
  display: inline;
  padding: 0;
  margin: 0;
  margin-left: 1em; 
  
  &:first-of-type {
    margin-left: 0;
  }
`

const ContentBottomBar = ({ notes, refs }) => (
  <BottomBar visible={ (notes.length + refs.length) > 0 }>
    <Container>
      <List>
        { notes.map(({ id, text, children }) => (
          <ListElem key={`note-${id}`}>
            <Note inBottomBar={true} text={text} id={id}>{ children }</Note>
          </ListElem>
        ))}
      </List>
      <List>
        { refs.map(({ id, text, children }) => (
          <ListElem key={`ref-${id}`}>
            <Ref inBottomBar={true} text={text} id={id}>{ children }</Ref>
          </ListElem>
        ))}
      </List>
    </Container>
  </BottomBar>

)

export default ContentBottomBar
