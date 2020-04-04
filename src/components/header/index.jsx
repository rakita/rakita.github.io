import React from "react"
import { Link } from "gatsby"

import "./index.scss"

export const Header = ({ title }) => {
  return (
    <div>
      <div className="header">
        <div className="header-menu">
          <Link to={`/home`} className="link">
            Home
          </Link>
          <Link to={`/about`} className="link">
            About
          </Link>
          <Link to={`/blog`} className="link">
            Blog
          </Link>
        </div>
        <div className="header-logo">
          <Link to={`/`} className="link">
            <h1>Blue Alloy</h1>
            <h2>Personal blog about software</h2>
          </Link>
        </div>
      </div>
      <hr className="header-hr" />
    </div>
  )
}
