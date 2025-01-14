import './hover.css';
import React, { useState, useEffect } from 'react';
import { DEFAULT_NAME, KEYBOARD_TRIGGERS_CLIPBOARD } from './global-settings';
import * as Helper from './helper';

let activeHierarchyKey: '1' | '2' | '3' | '4' = '1';
let currentKey = '';

const writeToClipboard = (text: string) => {
  Helper.writeToClipboard(text, () => {
    currentKey = '';
  });
};

const fnMouseMove = (evt: Event) => {
  if (!(evt.target as HTMLElement).children.length) {
    const element = Helper.getElementByHierarchyKey(
      evt.target as HTMLElement,
      activeHierarchyKey
    ) as HTMLElement;
    const tag = (element.tagName ?? '').toLowerCase();

    console.log(element);

    const id = element.getAttribute('id');
    const dataTestId = element.getAttribute('data-testid');
    const href = element.getAttribute('href');
    const className = element.getAttribute('class');
    const text = element.innerHTML.includes('<') ? '' : element.innerHTML;

    if (text && currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.textKey) {
      writeToClipboard(
        `${DEFAULT_NAME} = By.XPATH, "//${tag}[text()='${text}']"`
      );
    } else if (
      className &&
      currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.classKey
    ) {
      writeToClipboard(
        `${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}.${className
          .split(' ')
          .join('.')}"`
      );
    } else if (
      dataTestId &&
      currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.dataTestIdKey
    ) {
      writeToClipboard(
        `${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}[data-testid=${dataTestId}]"`
      );
    } else if (id && currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.idKey) {
      writeToClipboard(`${DEFAULT_NAME} = By.ID, "${id}"`);
    } else if (href && currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.hrefKey) {
      writeToClipboard(
        `${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}[href=${href}]"`
      );
    }
  }
};

const fnKeyDown = (evt: Event) => {
  const key = (evt as KeyboardEvent).key.toUpperCase();

  console.log('key', key);

  if (KEYBOARD_TRIGGERS_CLIPBOARD.hierarchyKeys.includes(key)) {
    activeHierarchyKey = key as '1' | '2' | '3' | '4';
  } else if (evt.target) {
    currentKey = key;
  }
  return false;
};

document.addEventListener('keydown', fnKeyDown);
document.addEventListener('mousemove', fnMouseMove);

const App = () => {
  useState(() => {
    console.log('python_locator is active, with React');
  });

  return (
    <div className="fixed bottom-[-200px] left-0 w-[300px] h-[200px] z-[15000]">
      python locator interface
    </div>
  );
};

export default App;
