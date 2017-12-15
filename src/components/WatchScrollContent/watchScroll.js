import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'

const watchElement = (Wrapped, {
  numbering = true,
  collection,
}) => {
  console.log(`watchScroll[${collection}].numbering ?`, numbering)

  return class extends Component {
    static contextTypes = {
      scrollWatcher: PropTypes.object,
    }

    static defaultProps = {
      inBottomBar: false
    }

    watcher(){
      return this.context.scrollWatcher
    }

    onEnter(){
      this.watcher().showElement(
        this.id, collection
      )
    }
    
    onLeave(){
      this.watcher().hideElement(
        this.id, collection
      )
    }
    
    render(){
      let id
      const watcher = this.watcher()
      const { text, children, inBottomBar } = this.props
      if(inBottomBar){
        id = this.props.id
      } else {
        const element = watcher.addElement(
          text, children, collection, numbering
        )
        id = element.id
      }

      this.id = id
      const element = (
        <Wrapped
          watcher={watcher}
          id={id}
          inBottomBar={inBottomBar}
          text={text}
          children={children}
        />
      )
      console.log('element', element)
      if (inBottomBar) {
        return element
      } else {
        return (
          <Waypoint 
            onEnter={() => this.onEnter()}
            onLeave={() => this.onLeave()}
            topOffset={-10}
            bottomOffset={-20}
          >
            { element }
          </Waypoint>
        )
      }
    }
  }
}

export default watchElement