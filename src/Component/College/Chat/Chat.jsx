import React from "react";
import './Chat.css'
function Chat() {
  return (
    <div className="wrapper">
      <div className="chat-section">
        <div className="chat-container">
          {/* Sidebar */}
          <aside className="chat-sidebar">
            <a href="#" className="chat-sidebar-logo">
              <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            </a>
            <ul className="chat-sidebar-menu">
              <li>
                 <a href="#" >
              <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="person-outline"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="folder-outline"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="settings-outline"></ion-icon>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Chat;
