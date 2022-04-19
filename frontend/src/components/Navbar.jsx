import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Avatar,  useChannelStateContext, useChat, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';



const cookies = new Cookies();
const authToken = cookies.get("token");
const image = cookies.get("avatarURL");
const username = cookies.get("username");

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
 


  const logout = () => {

    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('email');
    cookies.remove('institution');
    cookies.remove('course');

    window.location.reload();


  }

  return (
    <div className="g__navbar">
      <nav className="flex items-center justify-between h-15 p-4 px-8">
    
          {authToken ? (     
          <a className="logo" href='/'>
            
          <Avatar image={image} name={username} />
          </a>)  : (
            <a className="logo" href='/'>
            <span className="font-bold text-black">student</span>
            <span className="text-gray-600">.</span>
            <span className="muted font-light">connect</span> 
          </a>
          )}
       

      </nav>

      {authToken ? (
        <div className="g__navbar-sign" onClick={logout}>
          <p className='logout'>Log out</p>
        </div>) :
       
          <div className="g__navbar-sign">
            <NavLink exact to={{pathname: "/login", state: false,}}>
              <p className='g__navbar-sign_in'>Sign in</p> 
            </NavLink>
            <NavLink exact to={{pathname: "/login", state:  true,}} >
              <p className='g__navbar-sign_up'>Sign up</p>  
            </NavLink>
          </div>
        }


      <div className="g__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="g__navbar-menu_container scale-up-center">
            <NavLink exact to="/login">
              <div className="g__navbar-menu_container-links-sign ">
                <p className='g__navbar-sign_in'>Sign in</p>
                <p className='g__navbar-sign_up'>Sign up</p>
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
