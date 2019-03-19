import React from 'react';

import './Loading.css';

// Styles are inlined to ensure there's
// no flash of unstyled content
// before the CSS file loads
const Loading = props => (
  <div
    className={'loading' + (props.hide === true ? ' loading_hide' : '')}
    style={{
      position: 'fixed',
      zIndex: 1000,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      color: '#111',
      background: '#f7f7f7',
    }}
  >
    <div className="spinner" />
    <div
      className="loading__message"
      style={{
        position: 'absolute',
        top: 'calc(50% + 20px)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '2px',
        color: '#777',
      }}
    >
      Loading
    </div>
  </div>
);

export default Loading;
