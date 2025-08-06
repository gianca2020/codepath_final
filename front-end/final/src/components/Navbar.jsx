import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-900 p-4 text-white">
      <div>
        <p>Final Project</p>
      </div>

      <div className="flex justify-center border border-white rounded-lg p-1 mx-4 bg-grey-800">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/post">New Post</Link>
      </div>
    </nav>
  );
};

export default Navbar;
