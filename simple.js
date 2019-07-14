const {
  isMainThread,
  Worker,
  workerData,
  parentPort,
} = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: 'Global data',
  });
  worker.on('message', (message) => {
    console.log('I am the parent and I got a message from a thread child -> ', message)
  });
} else {
  console.log('workerData object -> ', workerData);
  parentPort.postMessage({
    message: 'Here, currently talking from a thread child',
  });
}
