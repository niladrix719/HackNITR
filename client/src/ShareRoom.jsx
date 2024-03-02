/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShareRoom = ({ socket }) => {
  const [loading, setLoading] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on("joined", () => {
      navigate(`/code`);
    });
  }, [socket]);

  const getRoom = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/create", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRoomCode(res.data?.room.room_code);
      if (typeof socket?.emit !== "function") return;
      // Emit "create" event to the server when a room is created
      socket.emit("create", res.data?.room.room_code);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }

    getRoom();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center bg-[url('/home.png')] bg-cover bg-no-repeat justify-center">
      <div className="container-custom-xs p-8 backdrop-blur-md rounded-2xl backdrop-brightness-50 backdrop-saturate-150 text-white border border-white/20 flex flex-col gap-4">
        <h1 className="text-lg">Share Room</h1>
        <div className="share-room">
          <p className="mb-2">
            Share this room code with your friends to join the room
          </p>
          <div className="flex gap-4 items-center bg-white/20 p-2 rounded-lg">
            <code className="flex-1">{roomCode}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomCode);
              }}
              className="copy p-2 hover:bg-white/10 rounded-lg transition-all duration-300 ease-in-out hover:text-white/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zM4 8q-.425 0-.712-.288T3 7q0-.425.288-.712T4 6q.425 0 .713.288T5 7q0 .425-.288.713T4 8m0 3.5q-.425 0-.712-.288T3 10.5q0-.425.288-.712T4 9.5q.425 0 .713.288T5 10.5q0 .425-.288.713T4 11.5M4 15q-.425 0-.712-.288T3 14q0-.425.288-.712T4 13q.425 0 .713.288T5 14q0 .425-.288.713T4 15m0 3.5q-.425 0-.712-.288T3 17.5q0-.425.288-.712T4 16.5q.425 0 .713.288T5 17.5q0 .425-.288.713T4 18.5M4 22q-.425 0-.712-.288T3 21q0-.425.288-.712T4 20q.425 0 .713.288T5 21q0 .425-.288.713T4 22m3.5 0q-.425 0-.712-.288T6.5 21q0-.425.288-.712T7.5 20q.425 0 .713.288T8.5 21q0 .425-.288.713T7.5 22m3.5 0q-.425 0-.712-.288T10 21q0-.425.288-.712T11 20q.425 0 .713.288T12 21q0 .425-.288.713T11 22m3.5 0q-.425 0-.712-.288T13.5 21q0-.425.288-.712T14.5 20q.425 0 .713.288T15.5 21q0 .425-.288.713T14.5 22"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ShareRoom;
