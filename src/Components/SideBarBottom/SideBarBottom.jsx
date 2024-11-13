import React from 'react';
import './SideBarBottom.css'; //StyleSheet

function SideBarBottom() {
  return (
    <div id='bottom'>
      <div>
        <div className="nav"><i className='bx bxs-home'></i>Home</div>
        <div className="nav"><i className='bx bxs-user-circle'></i>Guest</div>
        <div className="nav"><i className='bx bxs-rocket' ></i>Upgrade to Pro</div>
      </div>
    </div>
  )
};

export default SideBarBottom;