import React, { Component } from 'react'

export class CustomSidebar extends Component {
  // @ts-ignore
  render = (props, ...children) => (
    <div>
      <h1>Sidebar</h1>
      {children}
    </div>
  )
}

export default CustomSidebar
