import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/users/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center bg-[url('/home.png')] bg-cover bg-no-repeat justify-center">
      <form
        className="container-custom-xs p-8 backdrop-blur-md rounded-2xl backdrop-saturate-150 text-white border border-white/20 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="rounded-lg py-2 text-3xl font-semibold">Signup</h1>
        {error && (
          <div className="rounded-lg border border-red-500 px-4 py-2 text-red-400">
            {error}
          </div>
        )}
        <div className="input-group flex flex-col gap-4">
          <label htmlFor="name">Name</label>
          <input
            pattern=".{3,}"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="rounded-lg text-black border border-gray-400 px-4 py-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="input-group flex flex-col gap-4">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            type="email"
            id="email"
            className="rounded-lg text-black border border-gray-400 px-4 py-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="input-group flex flex-col gap-4">
          <label htmlFor="password">Password</label>
          <input
            pattern=".{8,}"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="rounded-lg text-black border border-gray-400 px-4 py-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          className="rounded-lg py-2 bg-blue-500 text-white font-semibold"
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
