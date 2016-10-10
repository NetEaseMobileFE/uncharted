import React, { Component } from 'react'
import { Link } from 'react-router'

export default function UniversalTitle(props) {
  const { text, link, showMore } = props
  return (
    <div className="record-title">
      <div className="record-title-text">{text}</div>
      {
        showMore && <Link className="record-title-info" to={link}> {showMore}</Link>
      }
    </div>
  )
}
