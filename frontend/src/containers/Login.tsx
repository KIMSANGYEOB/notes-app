import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton"; // 새로 추가
import { Auth } from "aws-amplify";
import { Authentication, useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import "./Login.css";

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext() as Authentication;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
  
    setIsLoading(true);

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e: unknown) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
          className={""}
          >
          로그인
        </LoaderButton>
      </Form>
    </div>
  );
}