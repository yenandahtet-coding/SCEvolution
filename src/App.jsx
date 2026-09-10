import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'docs', label: 'Documentation' }, { id: 'social', label: 'Community' }]
  function handleTabKeyDown(event, index) {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = tabs.length - 1
    else return
    event.preventDefault()
    setActiveTab(tabs[nextIndex].id)
    document.getElementById('tab-' + tabs[nextIndex].id).focus()
  }

  return (
    <>
      <header className="app-header">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setActiveTab('overview') }}><span className="brand-mark" aria-hidden="true">✳</span> Workspace</a>
        <span className="theme-label"><span aria-hidden="true">☀</span> Light mode</span>
      </header>
      <nav className="navigation" aria-label="Workspace sections">
        <div className="pill-navigation" role="tablist" aria-label="Workspace sections">
          {tabs.map((tab, index) => (
            <button key={tab.id} id={'tab-' + tab.id} type="button" role="tab"
              aria-selected={activeTab === tab.id} aria-controls={tab.id === 'overview' ? 'center' : tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}>{tab.label}</button>
          ))}
        </div>
      </nav>
      <section id="center" role="tabpanel" aria-labelledby="tab-overview" tabIndex={0} hidden={activeTab !== 'overview'}>
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 2)}
        >
          Count is {count}
        </button>
      </section>

      

      <section id="next-steps" hidden={activeTab === 'overview'}>
        <div id="docs" role="tabpanel" aria-labelledby="tab-docs" tabIndex={0} hidden={activeTab !== 'docs'}>
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social" role="tabpanel" aria-labelledby="tab-social" tabIndex={0} hidden={activeTab !== 'social'}>
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      
      <footer className="app-footer">Built with React + Vite<span>A little space to build something great.</span></footer>
    </>
  )
}

export default App
