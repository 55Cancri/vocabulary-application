import React from 'react'
import { Link } from 'react-router-dom'

export const SplashPage = () => (
  <div>
    <header>
      <nav className="splash-nav">
        <Link to="/login" className="item">
          Login
        </Link>
        <Link to="/signup" className="item">
          Signup
        </Link>
      </nav>
    </header>
    <main className="splash-body">
      <section className="block -top">
        <h1 className="title">Reimbursement System</h1>
        <p className="subtitle">Login or Signup</p>
        <Link to="/signup" className="cta">
          React router too!
        </Link>
      </section>
      <section className="block -middle">
        <h2 className="title">Subhead 1</h2>
        <ul className="list">
          <li>Sass reloading</li>
          <li>Typescript with react type checking</li>
          <li>Webpack run start and webpack run build fully functional</li>
        </ul>
      </section>
      <section className="block -bottom">
        <h2 className="title">Subhead 2</h2>
        <p className="text">
          Took something like a week and a friend from stackoverflow to get this
          working!
        </p>
      </section>
    </main>
    <footer>
      <div>
        <ul>
          <li>About</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div>
        {/* <Link to="https://www.facebook.com">Facebook</Link> */}
        {/* <Link to="https://www.twitter.com">Twitter</Link> */}
      </div>
    </footer>
  </div>
)

export default SplashPage
