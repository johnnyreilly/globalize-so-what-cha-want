import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class FluxStore {
  constructor() {
    this._emitter = new EventEmitter();
  }

  _emitter: EventEmitter;
  dispatchToken: string;

  _cleanState: () => void;
  _dispatcherHandler: (action: any) => void;

  emitChange() {
    this._emitter.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this._emitter.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this._emitter.removeListener(CHANGE_EVENT, callback);
  }
}

export default FluxStore;
