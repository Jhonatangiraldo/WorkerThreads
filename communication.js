const {
  isMainThread,
  Worker,
  MessageChannel,
  MessagePort,
  parentPort,
} = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  const subChannel = new MessageChannel();

  worker.postMessage({
    parentCommunicationPort: subChannel.port1,
  }, [subChannel.port1]);

  subChannel.port2.on('message', (value) => {
    console.log('received:', value);
  });
  
} else {
  parentPort.once('message', (value) => {
    // value.parentCommunicationPort instanceof MessagePort
    value.parentCommunicationPort.postMessage('the worker is sending this');
    value.parentCommunicationPort.close();
  });
}
