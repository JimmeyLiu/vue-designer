class EventBus {
  constructor() {
    // 初始化事件列表
    this.eventObject = {};
  }
  // 发布事件
  emit(meta, event, ...args) {
    // 取出当前事件所有的回调函数
    let eventName = event + "@" + meta.id;
    const callbackList = this.eventObject[eventName];

    if (!callbackList) return;

    // 执行每一个回调函数
    for (let callback of callbackList) {
      callback(args);
    }
  }
  // 订阅事件
  on(componentId, event, callback) {
    // 初始化这个事件
    let eventName = event + "@" + componentId;
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = [];
    }

    // 存储订阅者的回调函数
    this.eventObject[eventName].push(callback);
  }
}

export default new EventBus();
