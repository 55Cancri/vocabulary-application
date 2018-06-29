import React from 'react'
import { render } from 'react-dom'
import AppRouter from './routers/AppRouters'
import fontawesome from '@fortawesome/fontawesome'
import {
  faTimes,
  faEllipsisH,
  faBars,
  faSearch,
  faBell,
  faCaretDown,
  faAngleLeft,
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faPlus,
  faHome,
  faDollarSign,
  faShoppingCart,
  faSlidersH,
  faSitemap,
  faEraser,
  faTrash,
  faUpload,
  faGlobe
} from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(
  faTimes,
  faEllipsisH,
  faBars,
  faSearch,
  faBell,
  faHome,
  faCaretDown,
  faAngleLeft,
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faPlus,
  faDollarSign,
  faShoppingCart,
  faSlidersH,
  faSitemap,
  faEraser,
  faTrash,
  faUpload,
  faGlobe
)

import './styles/styles.sass'
import 'react-toggle/style.css'

render(<AppRouter />, document.getElementById('root'))
