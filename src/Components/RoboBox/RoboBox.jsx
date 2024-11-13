import React from 'react';
import './RoboBox.css'; // StyleSheet

function RoboBox(props) {
  return (
    <div id='ai'>
      <div id="answer">{props.answer}</div>
    </div>
  )
}

export default RoboBox;