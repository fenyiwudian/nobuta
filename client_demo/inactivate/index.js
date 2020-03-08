

const commander = {
  /**
   * @type {HTMLElement}
   */
  logger: null,
  all: 0,
  start() {
    this.logger = document.getElementById('logger');

    for (let i = 0; i < 10; i++) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `./iframe.html?id=${i}`);
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      const log = document.createElement('div');
      log.innerText = 0;
      log.setAttribute('id', `log-${i}`);
      document.body.appendChild(log);
    }
    const all = document.createElement('div');
    all.setAttribute('id', 'log-all');
    all.innerText = `共: 0`;
    document.body.appendChild(all);
    window.addEventListener('message', (e) => {
      const { data: { name, id } } = e;
      if (name === 'inactivate-test') {
        const log = document.getElementById(`log-${id}`);
        log.innerText = Number(log.innerText) + 1;
        this.all += 1;
        all.innerText = `共: ${this.all}`;
      }
    });
  }
};

commander.start();