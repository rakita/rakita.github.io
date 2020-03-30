import React from "react"
import { Link } from "gatsby"
import { Header } from '../components/header'

import { rhythm, scale } from "../utils/typography"


import './index.scss'

const Layout = ({ location, title, children }) => {

  return (
    <div className="main">

      <Header title="Title" />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
