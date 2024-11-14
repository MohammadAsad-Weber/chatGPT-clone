import React, { useContext, useState } from 'react';
import OPENAI_API_KEY from '../../assets/OPENAI_API_KEY';  // MY API KEY!
import logoSvg from '../../assets/Icon.svg' // Background logo image
import './MainContent.css'; // StyleSheet

// Importing Context API
import { ChatContext } from '../../Context';

// Components
import UserBox from '../UserBox/UserBox';
import RoboBox from '../RoboBox/RoboBox';
import Loader from '../Loader/Loader';

function MainContent() {
    const [chatLoading, setChatLoading] = useState(false);

    const context = useContext(ChatContext); // Using ChatContext API
    const information = 'ChatGPT can make mistakes. Check important info.';
    const textarea = document.getElementById('textarea');

    const handleKeyUp = (event) => {
        context.setQuery(event.target.textContent);
    };

    const handleClick = async () => {

        try {
            context.setChatbox((prevChatbox) => [...prevChatbox, <UserBox question={context.query} />]);
            textarea.textContent = '';
            setChatLoading(true);

            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    response_as_dict: true,
                    attributes_as_list: false,
                    show_base_64: true,
                    show_original_response: false,
                    temperature: 0,
                    max_tokens: 1000,
                    tool_choice: 'auto',
                    providers: ['openai/gpt-4o-mini'],
                    chatbot_global_action: 'You are a helpful assistant',
                    text: context.query
                })
            };

            const response = await fetch('https://api.edenai.run/v2/text/chat', options);
            const data = await response.json();
            const output = data["openai/gpt-4o-mini"].generated_text;

            context.setQuery('');
            setChatLoading(false);

            context.setChatbox((prevChatbox) => [...prevChatbox, <RoboBox answer={output} />]);

        } catch (error) {

            textarea.textContent = '';
            context.setQuery('');

            setTimeout(() => {
                setChatLoading(false);
                context.setChatbox((prevChatbox) => [...prevChatbox, <RoboBox answer='Some error has been occured. Please try again later!' />]);
            }, 5000)
        }
    };

    return (
        <div id='container'>
            {context.chatbox.length === 0 && <img id='background-logo' src={logoSvg} alt="" />} {/*Show this img, if there's no chat*/}
            <div id="chat-area">
                {/* Chats Will Go Here */}
                {context.chatbox.length !== 0 && context.chatbox.map((element, index) => { return <div key={index}>{element}</div> })} {/*Show the chats, if the array isn't empty*/}
                {chatLoading && <Loader />}
            </div>
            <div id="outer">
                <div id="input-area">
                    <p id='textarea'
                        onKeyUp={handleKeyUp}
                        textcontent={context.query}
                        contentEditable={true}
                        suppressContentEditableWarning
                    ></p>
                    {context.query.length === 0 && <div id="placeholder">Message ChatGPT</div>} {/*Show the placeholder, if there's no text*/}
                    <button id='send' onClick={handleClick} disabled={context.query.length === 0}><i className='bx bx-up-arrow-alt'></i></button>
                </div>
            </div>
            <div id="note">{information}</div>
        </div>
    )
};

export default MainContent;