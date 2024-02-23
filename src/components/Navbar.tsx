// import React from 'react'
import logo from "../assets/logo/TIX ID.svg";
import { RxDividerVertical } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const login = useSelector((state: any) => state.login);
  // const dispatch = useDispatch();

  return (
    <div className="fixed top-0 w-full mx-auto  flex bg-white drop-shadow-2xl h-20 border z-50">
      <div className="w-11/12 mx-auto flex justify-between items-center ">
        <div>
          <Link to={"/"}>
            <img src={logo} width={64} height={64} />
          </Link>
        </div>

        <nav>
          <ul className="mx-auto flex flex-row gap-x-10 items-center font-semibold">
            <li>
              <Link to={"/"}>
                <div className="hover:text-[--Shade-900]">Home</div>
              </Link>
            </li>
            <li>
              <Link to={"/my-ticket"}>
                <div className="hover:text-[--Shade-900]">My Tickets</div>
              </Link>
            </li>
            <li>
              <Link to={"/news"}>
                <div className="hover:text-[--Shade-900]">TIX ID News</div>
              </Link>
            </li>
            <li>
              <RxDividerVertical width={2} height={240} size={25} />
            </li>
            <li>
              <IoMdNotificationsOutline size={25} />
            </li>
            {!login.isLoggedIn && (
              <li className="text-[18px] font-medium leading-4 ">
                <Link to={"/signup"}>
                  <p className="text-black hover:text-black">Sign Up</p>
                </Link>
              </li>
            )}
            {!login.isLoggedIn && (
              <li className="w-[101px] h-[48px] rounded-md py-[12px] text-center bg-[--Royal-Blue] ">
                <Link to={"/login"}>
                  <p className="text-[--Pastel-Yellow] ">Login</p>
                </Link>
              </li>
            )}
            {login.isLoggedIn && (
              <li className="w-[101px] h-[48px] rounded-md py-[12px] text-center bg-[--Royal-Blue] ">
                <Link to={"/account"}>
                  <div className="text-[--Pastel-Yellow] ">
                    {login.userData.name.charAt(0)}
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
