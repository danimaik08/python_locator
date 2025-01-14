import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { REACT_ROOT_ID } from './global-settings';

const createReactRoot = () => {
  const element = document.createElement('div');
  element.id = REACT_ROOT_ID;
  document.body.appendChild(element);

  const root = createRoot(element);
  root.render(<App />);
};

export default createReactRoot;
