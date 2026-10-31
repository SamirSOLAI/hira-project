import "./Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <nav className="header-nav" aria-label="Main navigation">
        <a className="header-logo" href="/" aria-label="Hira homepage">
          Hira<span className="header-logo-dot" aria-hidden="true">.</span>
        </a>
        <div className="header-links">
          <a className="header-link" href="/discover">
            Find jobs
          </a>
          <a className="header-link" href="/profile">
            Profile
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
