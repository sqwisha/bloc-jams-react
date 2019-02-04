import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import logo from './images/logo-vint.png';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
`;

const Header = styled.header`
  margin: 0;
  position: absolute;
  width: 100%;
  padding: 14px 40px;
  background-color: #282C34;
  min-height: 100px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4em;
  color: white;
`;

const Logo = styled.img`
  width: 200px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 0.7em;
  color: #FFE0AA;
`;

const Main = styled.main`
  padding-top: 100px;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Header>
          <Link to="/"><Logo src={logo} alt="Vintage Jams - Turn the music up!" /></Link>
          <nav>
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/library">
              Library
            </NavLink>
          </nav>
        </Header>

        <Main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </Main>
      </AppContainer>
    );
  }
}

export default App;
