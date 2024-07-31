import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://blog-backend-0wcr.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      history.push("/"); // Redirect to home on successful login
    }
    console.log(response);

    console.error("Login failed:");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white py-12 px-9 md:px-11 rounded-xl shadow-lg w-[90vw] max-w-md"
      >
        <h3 className="text-3xl text-center font-semibold  mb-5">Login</h3>

        <div className="flex flex-col mb-3">
          <label className="text-lg mb-2">Username:</label>
          <input
            className="border border-stone-400 rounded-sm h-10 outline-none px-3"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label className="text-lg mb-2">Password:</label>
          <input
            className="border border-stone-400 rounded-sm h-10 outline-none px-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white h-9 w-28 font-semibold rounded text-md"
          >
            Submit
          </button>
        </div>
        <p className="text-center text-lg">
          New User?{" "}
          <Link to="/register" className="text-blue-700 font-bold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
