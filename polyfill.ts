/**
Polyfill for these events:

  - pushstate
  - replacestate
  - beforepushstate
  - beforereplacestate

These are similar to the standard browser events:
  - popstate
  - beforeunload

**/
function wrapHistoryFunction(functionName: string, eventName: string) {
  const orig = (window.history as any)[functionName];
  return function(...args: any[]) {
    const beforeEvent = new Event("before" + eventName, {
      cancelable: true,
      bubbles: true
    });
    const passed = window.dispatchEvent(beforeEvent);
    if (passed) {
      const returnValue = orig.apply(window.history, args);
      const event = new Event(eventName);
      window.dispatchEvent(event);
    }
  };
}
window.history.pushState = wrapHistoryFunction("pushState", "pushstate");
window.history.replaceState = wrapHistoryFunction("replaceState", "replacestate");
