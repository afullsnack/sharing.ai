
function subscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName: string, data?: any) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

enum CustomEvents {
  ShowWaitlistDialog = 'showWaitlistDialog'
}

export { publish, subscribe, unsubscribe, CustomEvents };
