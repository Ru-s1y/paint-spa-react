import React, { useState, useEffect } from 'react';
import '../design/paint.css';
import classNames from 'classnames';

export default function Cursor (props) {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [hidden, setHidden] = useState(false);
  const lineWidth = props.lineWid

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  });

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseMove = (e) => {
    setPosition({x: e.clientX, y: e.clientY});
  };

  const cursorClasses = classNames(
    'cursor',
    {
      'cursor--hidden': hidden
    }
  );

  return (
    <div
      className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: `${props.lineColor}`,
        width: `${lineWidth>2 ? lineWidth : 3}px`,
        height: `${lineWidth>2 ? lineWidth : 3}px`,
        border: `solid 1px ${props.shadowBlur>0 ? props.shadowColor : props.lineColor}`
      }}></div>
  )
}