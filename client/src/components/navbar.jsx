// import { NavLink } from "react-router-dom";
// import { twMerge } from "tailwind-merge";

// const links = [
//   { name: "Home", to: "/" },
//   { name: "About", to: "/about" },
//   { name: "Login", to: "/login" },
//   { name: "Signup", to: "/signup" },
//   { name: "Logout", to: "/" },
// ];

const Navbar = () => {
  return (
    <>
      <nav className="flex w-full h-16 bg-slate-900 text-white font-roboto text-xl">
        <img src="" alt="" />
        <div></div>
        <ul className="flex justify-around items-center m-auto w-full">
          <a href="">
            <li>Home</li>
          </a>
          <a href="">
            <li>About</li>
          </a>
          <a href="">
            <li>Services</li>
          </a>
          <a href="">
            <li>Contact</li>
          </a>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
