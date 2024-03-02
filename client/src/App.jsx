import Home from "./Home";
import Code from "./Code";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ShareRoom from "./ShareRoom";
import JoinRoom from "./JoinRoom";
import { io } from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:8000");
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/code"
            element={<Code user={user} setUser={setUser} />}
          />
          <Route path="/join-room" element={<JoinRoom socket={socket} />} />
          <Route path="/share-room" element={<ShareRoom socket={socket} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
