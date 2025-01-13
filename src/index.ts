import './hover.css';
import { DEFAULT_NAME, KEYBOARD_TRIGGERS_CLIPBOARD } from './global-settings';

console.log('python_locator is active');

let activeHierarchyKey = '1';
let currentKey = '';

document.addEventListener('mousemove', (evt) => {
  if (!(evt.target as HTMLElement).children.length) {
    const element = getCurrentElementByActiveHierarchyKey(
      evt.target as HTMLElement
    ) as HTMLElement;
    const tag = (element.tagName ?? '').toLowerCase();

    console.log(element);

    const id = element.getAttribute('id');
    const dataTestId = element.getAttribute('data-testid');
    const href = element.getAttribute('href');
    const className = element.getAttribute('class');
    const text = element.innerHTML.includes('<') ? '' : element.innerHTML;

    if (text && currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.textKey) {
      navigator.clipboard.writeText(
        `${DEFAULT_NAME} = By.XPATH, "//${tag}[text()='${text}']"`
      );
      console.log('copied!');
      currentKey = '';
    } else if (
      className &&
      currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.classKey
    ) {
      navigator.clipboard.writeText(
        `${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}.${className
          .split(' ')
          .join('.')}"`
      );
      console.log('copied!');
      currentKey = '';
    } else if (
      dataTestId &&
      currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.dataTestIdKey
    ) {
      navigator.clipboard.writeText(
        `${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}[data-testid=${dataTestId}]"`
      );
      console.log('copied!');
      currentKey = '';
    } else if (id && currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.idKey) {
      navigator.clipboard.writeText(`${DEFAULT_NAME} = By.ID, "${id}"`);
      console.log('copied!');
      currentKey = '';
    } else if (href && currentKey === KEYBOARD_TRIGGERS_CLIPBOARD.hrefKey) {
      navigator.clipboard.writeText(
        `${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}[href=${href}]"`
      );
      console.log('copied!');
      currentKey = '';
    }
  }
});

const getCurrentElementByActiveHierarchyKey = (element: HTMLElement) => {
  switch (activeHierarchyKey) {
    case '1':
      return element;
    case '2':
      return element.parentElement ?? element;
    case '3':
      return (
        element.parentElement?.parentElement ?? element.parentElement ?? element
      );
    case '4':
      return (
        element.parentElement?.parentElement?.parentElement ??
        element.parentElement?.parentElement ??
        element.parentElement ??
        element
      );
  }
};

document.addEventListener('keydown', (evt) => {
  const key = (evt as KeyboardEvent).key.toUpperCase();

  if (KEYBOARD_TRIGGERS_CLIPBOARD.hierarchyKeys.includes(key)) {
    activeHierarchyKey = key;
  } else if (evt.target) {
    currentKey = key;
  }
  return false;
});
