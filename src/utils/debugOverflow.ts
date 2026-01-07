// Debug utility to find elements causing horizontal overflow
export const debugOverflow = () => {
  if (typeof window === 'undefined' || !import.meta.env.DEV) return;

  const findOverflowElements = (element: Element, results: Array<{element: Element, scrollWidth: number, clientWidth: number, className: string, tagName: string}>) => {
    if (element.scrollWidth > element.clientWidth) {
      results.push({
        element,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        className: element.className || '',
        tagName: element.tagName,
      });
    }
    
    Array.from(element.children).forEach(child => {
      findOverflowElements(child, results);
    });
  };

  const results: Array<{element: Element, scrollWidth: number, clientWidth: number, className: string, tagName: string}> = [];
  findOverflowElements(document.body, results);

  if (results.length > 0) {
    console.group('🔍 Elements causing horizontal overflow:');
    results.forEach(({ element, scrollWidth, clientWidth, className, tagName }) => {
      console.log(`%c${tagName}`, 'color: red; font-weight: bold', {
        className,
        scrollWidth,
        clientWidth,
        overflow: scrollWidth - clientWidth,
        element,
      });
    });
    console.groupEnd();
  } else {
    console.log('✅ No horizontal overflow detected');
  }

  return results;
};

