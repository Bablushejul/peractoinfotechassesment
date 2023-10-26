import React, { useState } from "react";
import { Modal, Form, Button, Nav } from "react-bootstrap";
import CartContext from "../Context/CartContext";
import { useContext } from "react";

const SignUpModal = () => {
  const ctx = useContext(CartContext);
  const show = ctx.signInModalVisibility;
  const setShow = ctx.setSignInModalVisibility;
  const [isSignIn, setIsSignIn] = useState(false);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    let URL ="https://dummyjson.com/users"
   

    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        // returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.error) {
      alert(data.error.message);
      console.log(data.error.message);
    } else {
      if (data.registered) {
        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem("email", email);
        ctx.setUserEmail(email);
        ctx.setIsLogedIn(true);
        ctx.setSignInModalVisibility(false);
        ctx.setIdToken(data.idToken);
        console.log(data.idToken);
      } else {
        setIsSignIn(true);
      }
    }
    console.log(data);
    
    // User account created successfully
  };

  const handleSignIn = () => {
    setIsSignIn(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Nav variant="pills" defaultActiveKey={"sign-in"}>
            <Nav.Item>
              <Nav.Link eventKey="sign-in" onClick={handleSignIn}>
                Sign In
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button
                variant="outline-primary"
                type="submit"
                className="mt-3"
                style={{ width: "10rem" }}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
