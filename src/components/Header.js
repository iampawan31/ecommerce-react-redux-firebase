import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { logout } from '../firebase-config'
import { Link } from 'react-router-dom'

const Header = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="bg-yellow-500 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        {/* Logo */}
        <Link to="/" className="flex">
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            Shop
          </span>
        </Link>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center md:order-2">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex mr-3 text-sm"
            id="user-menu-button"
            aria-expanded={menuOpen}
            data-dropdown-toggle="dropdown"
          >
            <span className="sr-only">Open user menu</span>
            <FontAwesomeIcon icon={menuOpen ? faClose : faBars} />
          </button>
        </div>
        {/* Main Menu */}
        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } justify-between items-center w-full transition md:flex md:w-auto md:order-1`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium w-full">
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/orders"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Dashboard
              </Link>
            </li>
            {!user && (
              <li>
                <Link
                  to="/auth/login"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  to="/auth/register"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Register
                </Link>
              </li>
            )}
            {user && (
              <li>
                <button
                  onClick={logout}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
