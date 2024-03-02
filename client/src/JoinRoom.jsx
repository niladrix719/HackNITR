/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoom = ({ socket }) => {
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on("joined", () => {
      navigate(`/code`);
    });
  }, [socket]);

  const joinRoom = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/join",
        {
          room_code: joinRoomCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      socket?.emit("join", joinRoomCode);
    } catch (error) {
      console.log(error);
      setError("Failed to join the room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center bg-[url('/home.png')] bg-cover bg-no-repeat justify-center">
      <div className="container-custom-xs p-8 backdrop-blur-md rounded-2xl backdrop-brightness-50 backdrop-saturate-150 text-white border border-white/20 flex flex-col gap-4">
        <h1 className="text-lg">Join Room</h1>
        <div className="share-room">
          <p className="mb-2">Join with the room code</p>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={joinRoomCode}
              onChange={(e) => setJoinRoomCode(e.target.value)}
              placeholder="Room Code"
              className="p-2 rounded-lg flex-1 text-black"
            />
            <button
              onClick={joinRoom}
              className="join p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
            >
              Join Room
            </button>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default JoinRoom;
