import React, { Component } from 'react'
import { Link } from 'react-router'

export default class UniversalTitle extends Component {
  render() {
    const { text, link, showMore } = this.props
    return (
      <div className="record-title">
        <div className="record-title-text">{text}</div>
        { 
          showMore && <Link className="record-title-info" to={link}> {showMore}</Link>
        }
      </div>
    )
  }
}
