import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://blog-backend-0wcr.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    if (response.ok) {
      //   console.log(response);
      history.push("/login");
    } else {
      console.log(error);
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white py-12 px-9 md:px-11 rounded-xl shadow-lg w-[90vw] max-w-md"
      >
        <h3 className="text-3xl text-center font-semibold  mb-5">Register</h3>
        <div className="flex flex-col mb-3 ">
          <label className="text-lg mb-2">Email:</label>
          <input
            className="border border-stone-400 rounded-sm h-10 outline-none px-3"
            type="text"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-lg mb-2">Username:</label>
          <input
            className="border border-stone-400 rounded-sm h-10 outline-none px-3"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            required
          />
        </div>
        {error && (
          <div>
            <p className="text-red-600">{errorMessage}</p>
          </div>
        )}
        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white h-9 w-28 font-semibold rounded text-md"
          >
            Submit
          </button>
        </div>
        <p className="text-center text-lg">
          Already a user?{" "}
          <Link to="/login" className="text-blue-700 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
