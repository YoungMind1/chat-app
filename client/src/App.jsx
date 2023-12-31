import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  //if a user exist show the chat. else, just go to the component!
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <login/>} />
          <Route path="/register" element={user ? <Chat /> : <Register/>} />
          <Route path="/login" element={user ? <Chat /> : <login/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
