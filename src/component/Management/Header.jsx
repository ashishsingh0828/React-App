import React, { useEffect } from 'react';
import './management.css'
import { setupToggleMenu } from '../../assets/js/main.js'; 

function Header() {
   useEffect(() => {
     setupToggleMenu(); 
   }, []);
  return (
    <div className="topbar">
      <div className="toggle">
        <ion-icon name="menu-outline"></ion-icon>
      </div>
      <div className="search">
        <label >
          <input type="text" placeholder='type here..' />
         <ion-icon name="search-outline"></ion-icon>
        </label>
      </div>
<div className="notification position-relative">
  <button className="notification-btn">
    <span className="position-relative">
      <ion-icon name="notifications-outline"></ion-icon>
      <span className="alarm-notify"></span>
    </span>
  </button>

  <div className="notification-dropdown">
    <div className="card border-0 rounded-12 shadow-sm">
      <div className="card-body p-0">
        <div className="p-3 bg-main-600 d-flex justify-content-between align-items-center">
          <h5 className="text-white mb-0">Notifications</h5>
          <button className="btn text-white close-dropdown p-0 fs-5">
            <i className="ph ph-x"></i>
          </button>
        </div>

        <div className="p-3 max-h-270 overflow-auto">
          <div className="d-flex align-items-start gap-2 mb-3 pb-3 border-bottom">
            <img src="assets/images/thumbs/notification-img1.png" alt="" className="rounded-circle" width="40" height="40" />
            <div>
              <p className="mb-1 fw-medium text-gray-800">Ashwin Bose is requesting access to Design File - Final Project.</p>
              <span className="text-muted small">2 mins ago</span>
            </div>
          </div>

          <div className="d-flex align-items-start gap-2">
            <img src="assets/images/thumbs/notification-img2.png" alt="" className="rounded-circle" width="40" height="40" />
            <div>
              <p className="mb-1 fw-medium text-gray-800">Patrick added a comment on Design Assets - Smart Tags file.</p>
              <span className="text-muted small">4 mins ago</span>
            </div>
          </div>
        </div>

        <a href="#" className="text-center d-block py-2 fw-bold text-primary-600 border-top text-decoration-none hover-underline">
          View All
        </a>
      </div>
    </div>
  </div>
</div>


      <div className="user">
        <img src="../../../public/Images/user.png" alt="" />
      </div>
    </div>
 
  )
}

export default Header;
