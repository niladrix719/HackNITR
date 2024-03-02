import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
    navigate("/share-room");
  }
  const handleJoinRoom = () => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
    navigate("/join-room");
  }
  return (
  <div className="min-h-screen bg-[url('/home.png')] bg-cover bg-no-repeat">
    <Navbar />
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
        <button
        onClick={handleCreateRoom}
          className="rounded-lg border-2 border-b-8 border-black bg-white px-8 py-4 font-bold">
        Create Room
      </button>
        <button
        onClick={handleJoinRoom}
          className="rounded-lg border-2 border-b-8 border-black bg-[#b5eac7] px-8 py-4 font-bold">
        Join Room
      </button>
    </main>
  </div>
);}

export default Home;
