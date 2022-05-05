import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./lib/contextLib";
import { onError } from "./lib/errorLib";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);

    history.push("/login");
  }

  return (
    isAuthenticating ? null : (
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
                <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
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
    )
  );
}

export default App;