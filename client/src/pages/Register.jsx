import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {registerUser,registerError,isRegisterLoading} = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>

              <Form.Control
                type="text"
                placeholder="Name"
              />
              <Form.Control
                type="email"
                placeholder="Email"
              />
              <Form.Control
                type="password"
                placeholder="Password"
              />
              <Button variant="primary" type="submit">
                {isRegisterLoading?"Creating your account":"Register"}
              </Button>
              {
                registerError?.error && <Alert variant="danger">
                <p>{registerError?.message}</p>
              </Alert>
              }

              <Alert variant="danger">
                <p>An Error occured!!!</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
