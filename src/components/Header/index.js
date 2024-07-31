import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  return (
    <nav className="h-20 w-screen bg-white  border-b-[1px] fixed top-0 left-0 z-10 flex justify-center">
      <div className="w-[95%] flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          <Link to="/">BlogPost</Link>
        </h2>
        <div className="flex justify-center items-center">
          <button className="border border-stone-900 rounded-md h-9 w-24 mr-2">
            Log Out
          </button>
          {/* Here we will get the username of logged user's first letter of username */}
          <button className="border border-stone-900 rounded-full h-8 w-8">
            A
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
