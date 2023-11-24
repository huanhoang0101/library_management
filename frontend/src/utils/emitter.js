import EventEmitter from 'events';

const _emitter = new EventEmitter();
_emitter.getMaxListeners(0);

export const emitter = _emitter;