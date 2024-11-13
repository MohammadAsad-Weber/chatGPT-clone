import React from 'react';
import './UserBox.css'; // StyleSheet

function UserBox(props) {
  return (
    <div id='user'>
      <div id="question">{props.question}</div>
    </div>
  )
}

export default UserBox;