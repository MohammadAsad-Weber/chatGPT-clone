import React, { useContext } from 'react';
import icon from '../../assets/Icon.webp'; // ChatGPT Icon
import './SideBarTop.css'; // STyleSheet

// Importing Context API
import { ChatContext } from '../../Context';

function SideBarTop() {
    const context = useContext(ChatContext);

    // To clear chat-area
    const newChat = () => {
        context.setChatbox([]);
        context.setQuery('');
    };

    return (
        <div id='top'>
            <header>
                <img src={icon} alt="" />
                <h2 id='name'>ChatGPT</h2>
            </header>
            <main>
                <button id='new-chat' onClick={newChat}><i className="fa-solid fa-plus"></i> New Chat</button>

                <div id="suggestions">
                    <div className="suggestion"><i className='bx bx-comment'></i>What is Programming?</div>
                    <div className="suggestion"><i className='bx bx-comment'></i>What is API?</div>
                </div>
            </main>
        </div>
    )
};

export default SideBarTop;