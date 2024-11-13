import { createContext, useState } from "react";

// Context Created
export const ChatContext = createContext();

function IndexContext(props) {
    const [query, setQuery] = useState('');
    const [chatbox, setChatbox] = useState([]);

    return (
        // Providing Values
        
        <ChatContext.Provider value={{ query, setQuery, chatbox, setChatbox }}>
            {props.children}
        </ChatContext.Provider>
    )
};

export default IndexContext;