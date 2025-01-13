import {
  ALL_HIERARCHY,
  MOUSE_TRIGGER,
  KEYBOARD_TRIGGER,
  DEFAULT_NAME,
} from './global-settings';

console.log('python_locator is active');

let isLoggingLocators = false;

const processElement = (element: HTMLElement) => {
  console.log('### --- ###');
  console.log(element);

  const parent = element.parentNode;
  const tag = (element.tagName ?? '').toLowerCase();

  if (tag) {
    const id = element.getAttribute('id');
    const dataTestId = element.getAttribute('data-testid');
    const href = element.getAttribute('href');
    const className = element.getAttribute('class');

    if (!element.innerHTML.includes('<')) {
      console.log(
        `${DEFAULT_NAME} = By.XPATH, "//${tag}[text()='${element.innerHTML}']"`
      );
    }

    if (className) {
      console.log(
        `${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}.${className
          .split(' ')
          .join('.')}"`
      );
    }

    if (dataTestId) {
      console.log(
        `${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}[data-testid=${dataTestId}]"`
      );
    }

    if (id) {
      console.log(`${DEFAULT_NAME} = By.ID, "${id}"`);
    }

    if (href) {
      console.log(`${DEFAULT_NAME} = By.CSS_SELECTOR, "${tag}[href=${href}]"`);
    }
  }

  if (ALL_HIERARCHY) {
    if (
      parent &&
      (parent as HTMLElement)?.click &&
      (parent as HTMLElement)?.tagName !== 'BODY' &&
      (parent as HTMLElement)?.tagName !== 'HTML'
    ) {
      processElement(parent as HTMLElement);
    }
  }
};

document.addEventListener(KEYBOARD_TRIGGER.eventName, (evt) => {
  if ((evt as KeyboardEvent).key.toUpperCase() === KEYBOARD_TRIGGER.key) {
    isLoggingLocators = !isLoggingLocators;
  }
});

document.addEventListener(MOUSE_TRIGGER, (evt) => {
  if (isLoggingLocators && evt.target) {
    processElement(evt.target as HTMLElement);
  }
  return false;
});
