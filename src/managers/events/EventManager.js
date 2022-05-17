import { EventEmitter } from 'events';

function EventManager(events) {
    const state = { event: { ...events }, emitter: new EventEmitter()};
    const invoke = (event, payload) => {
        state.emitter.emit(event, payload);
    }
    const addListener = (event, callback) => {
        state.emitter.on(event, callback);
    }
    const removeListener = (event, callback) => state.emitter.off(event, callback);
    const event = () => state.event;
    return {
        event,
        addListener,
        removeListener,
        invoke
    }
}

export default EventManager;