import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

if (typeof window !== 'undefined') {
  ReactDOM.render(<h1>Hello World!</h1>, document.getElementById('app-root'))
}
