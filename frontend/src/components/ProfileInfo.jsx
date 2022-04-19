import React from 'react';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ProfileInfo = () => {
//    const { client } = useChatContext();

  const userName = cookies.get("username");

  return ( 
    <div className='profile-container'>
        <a className="logo" href='/'>
          <span className="font-bold text-black">student</span>
          <span className="text-gray-600">.</span>
          <span className="muted font-light">connect</span>
        </a>
        <div className='profile-container_name'>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="5" fill="green" />
          </svg>
          <p className='text-sm font-medium'>{userName}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
