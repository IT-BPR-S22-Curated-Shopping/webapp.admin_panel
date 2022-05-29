import { EventEmitter } from 'events';
import { event } from './Event.js'

function EventManager() {
    const emitter = new EventEmitter();
    const invoke = (event, payload) => emitter.emit(event, payload);
    const addListener = (event, callback) => emitter.on(event, callback);
    const removeListener = (event, callback) => emitter.off(event, callback);
    return {
        event,
        addListener,
        removeListener,
        invoke
    }
}

export default EventManager;