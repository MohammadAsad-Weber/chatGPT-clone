import React, { useContext } from 'react';
import OPENAI_API_KEY from '../../assets/OPENAI_API_KEY';  // MY API KEY!
import logoSvg from '../../assets/Icon.svg' // Background logo image
import './MainContent.css'; // StyleSheet

// Importing Context API
import { ChatContext } from '../../Context';

// Components
import UserBox from '../UserBox/UserBox';
import RoboBox from '../RoboBox/RoboBox';

function MainContent() {

    const context = useContext(ChatContext); // Using ChatContext API
    const information = 'ChatGPT can make mistakes. Check important info.';
    const textarea = document.getElementById('textarea');

    const handleKeyUp = (event) => {
        context.setQuery(event.target.textContent);
    };

    const handleClick = async () => {

        try {
            if (context.query.length !== '') {
                context.setChatbox((prevChatbox) => [...prevChatbox, <UserBox question={context.query} />]);
                textarea.textContent = '';

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

                context.setQuery('');

                const output = data["openai/gpt-4o-mini"].generated_text;
                context.setChatbox((prevChatbox) => [...prevChatbox, <RoboBox answer={output} />]);
            }
        } catch (error) {
            textarea.textContent = '';
            context.setQuery('');

           setTimeout(()=>{ context.setChatbox((prevChatbox) => [...prevChatbox, <RoboBox answer={'Some error has been occured. \n Please try again later!'} />]);}, 1500)
        }
    };

    return (
        <div id='container'>
            {context.chatbox.length === 0 && <img id='bgcackground-logo' src={logoSvg} alt="" />} {/*Show this img, if there's no chat*/}
            <div id="chat-area">
                {/* Chats Will Go Here */}
                {context.chatbox.length !== 0 && context.chatbox} {/*Show the chats, if the array isn't empty*/}
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