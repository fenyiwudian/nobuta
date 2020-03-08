

const id = location.href.match(/[?&]id=(\d+)/)[1];

const sendMessage = () => {
  setTimeout(() => {
    window.parent.postMessage({
      name: 'inactivate-test',
      id,
    }, '*');
    sendMessage();
  }, 100);
};

sendMessage();
