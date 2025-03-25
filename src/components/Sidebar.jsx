import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 shadow-md">
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/saved-jobs"
            className={({ isActive }) =>
              `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            Saved Jobs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            Proposals & Applications
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-service"
            className={({ isActive }) =>
              `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            My Service
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;