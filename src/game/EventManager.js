export default class EventManager {

    constructor() {

        if(new.target !== EventManager){
            return
        }

        if (!EventManager.Singleton) {
            EventManager.Singleton = this;
            //初始化事件分发器对象
            this._dispather = new Laya.EventDispatcher();
        }
        return EventManager.Singleton;      
    }


    /**添加事件监听 */
    on(type, caller, listener, args = null) {
        this._dispather.on(type, caller, listener, args);
        
    }
    /**关闭事件监听 */
    off(type, caller, listener, onceOnly = false) {
        this._dispather.off(type, caller, listener, onceOnly);
    }
    /**执行一次后自动移除监听 */
    once(type, caller, listener, args = null) {
        this._dispather.once(type, caller, listener, args);
    }
    /**分发事件/抛出事件 */
    dispatch(type, data = null) {
        //console.log("type---->" + type);
        return this._dispather.event(type, data);
    }

}