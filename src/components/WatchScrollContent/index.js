/** 
 * Note system: detect notes on scroll & show them in bottom bar.
 */ 
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BottomBar from './BottomBar'
import NoteModal from '../NoteModal'

import { sleep } from '../../utils'

const ScrollWrapper = styled.div``
const Content = styled.div``

class WatchScrollContent extends Component {
  static childContextTypes = {
    scrollWatcher: PropTypes.object,
  }
  
  getChildContext(){
    return { scrollWatcher: this }
  }

  constructor(props){
    super(props)
    this.state = {
      notes: {},
      refs: {},
      isNoteModalOpen: false,
      noteModalContent: null
    }
  }

  async setNoteModalContent(content){
    this.closeNoteModal()
    await sleep(300)
    this.setState({ noteModalContent: content })
    this.openNoteModal()
  }

  openNoteModal(){
    this.setState({ isNoteModalOpen: true })
  }

  closeNoteModal(){
    console.log('closeNoteModal !')
    this.setState({ isNoteModalOpen: false })
  }
  
  addElement(text, children, collection, numbering){
    const elements = this.state[collection] = this.state[collection] || {}
    let id = Object.keys(elements).length + 1
    console.log(`WatchScrollContent[${collection}]- numbering`, numbering)

    if(!numbering){
      id = String.fromCharCode(96 + id)
    }
    const element = { text, children, id, visible: false }
    elements[id] = element
    return element
  }
  
  showElement(key, collection){
    const elements = this.state[collection]
    const element = elements[key]
    element.visible = true
    this.setState({ [collection]: elements })
  }

  hideElement(key, collection){
    const elements = this.state[collection]
    const element = elements[key]
    element.visible = false
    this.setState({ [collection]: elements })
  }

  visibleCollection(collection){
    return Object.keys(collection)
      .map(key => collection[key])
      .filter(element => element.visible)
  }

  visibleNotes(){
    return this.visibleCollection(this.state.notes)
  }

  visibleRefs(){
    return this.visibleCollection(this.state.refs)
  }

  render(){
    const { children } = this.props
    const { isNoteModalOpen, noteModalContent } = this.state
    const refs = this.visibleRefs()
    const notes = this.visibleNotes()
    const bottomBarProps = { refs, notes }
    return (
      <ScrollWrapper>
        <Content>
          { children }
        </Content>
        <BottomBar {...bottomBarProps}/>
        <NoteModal isOpen={isNoteModalOpen} content={noteModalContent}/>
      </ScrollWrapper>
    )
  }
}

export default WatchScrollContent
