import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Login", to: "/login" },
  { name: "Signup", to: "/signup" },
  { name: "Logout", to: "/" },
];

const Navbar = () => (
  <nav className="bg-white/20 py-6 backdrop-blur-lg">
    <div className="wrapper container-custom flex justify-between text-white">
      <a href="/" className="project-name text-lg font-semibold tracking-wider">
        Xseven.
      </a>
      <ul className="flex gap-4">
        {links.map((link, index) => {
          const isAuthenticated = localStorage.getItem("token");
          if (
            isAuthenticated &&
            (link.name === "Login" || link.name === "Signup")
          )
            return null;
          if (!isAuthenticated && link.name === "Logout") return null;
          return (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  twMerge(
                    "border-b-2",
                    isActive && link.name !== "Logout"
                      ? "border-green-500"
                      : "border-transparent",
                    link.name === "Login"
                      ? "rounded-lg bg-green-500 px-8 py-2 text-white"
                      : "",
                    link.name === "Signup"
                      ? "rounded-lg bg-blue-500 px-8 py-2 text-white"
                      : ""
                  )
                }
                onClick={() => {
                  if (link.name === "Logout") {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }
                }}
                to={link.to}
              >
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  </nav>
);

export default Navbar;
