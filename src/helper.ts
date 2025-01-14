export const getElementByHierarchyKey = (
  element: HTMLElement,
  hierarchyKey: '1' | '2' | '3' | '4'
) => {
  switch (hierarchyKey) {
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

export const writeToClipboard = (
  text: string,
  callback: () => void = () => {}
) => {
  navigator.clipboard.writeText(text);
  console.log('copied!');
  callback();
};
