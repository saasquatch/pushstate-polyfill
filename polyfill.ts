/**
Polyfill for these events:

  - pushstate
  - replacestate
  - beforepushstate
  - beforereplacestate

These are similar to the standard browser events:
  - popstate
  - beforeunload


  Please read: https://github.com/saasquatch/pushstate-polyfill/
  
**/
export default function polyfill() {
  function wrapHistoryFunction(functionName: string, eventName: string) {
    const orig = (window.history as any)[functionName];
    return function (...args: any[]) {
      const beforeEvent = new Event("before" + eventName, {
        cancelable: true,
        bubbles: true,
      });
      const notCancelled = window.dispatchEvent(beforeEvent);
      let passed = true;
      if (!notCancelled) {
        passed = window.confirm(
          "Are you sure you want to leave with unsaved changed?"
        );
      }
      if (passed) {
        orig.apply(window.history, args);
        window.dispatchEvent(new Event(eventName));
      }
    };
  }
  window.history.pushState = wrapHistoryFunction("pushState", "pushstate");
  window.history.replaceState = wrapHistoryFunction(
    "replaceState",
    "replacestate"
  );
}
