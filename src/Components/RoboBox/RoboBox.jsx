import React from 'react';
import icon from '../../assets/Icon.webp'
import './RoboBox.css'; // StyleSheet

function RoboBox(props) {
  return (
    <div id='ai'>
      <img src={icon} alt="" id="gpt-profile" />
      <div id="answer">{props.answer}</div>
    </div>
  )
}

export default RoboBox;