import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes"; // 상단에 추가
import { AppContext } from "./lib/contextLib";
import Nav from "react-bootstrap/Nav"; // --> 상단에 추가
import { LinkContainer } from "react-router-bootstrap"; // --> 상단에 추가

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false);

  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
            <>
              <LinkContainer to="/signup">
                <Nav.Link>회원가입</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>로그인</Nav.Link>
              </LinkContainer>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;