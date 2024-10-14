export default class QueryClient {
  cache = {};
  dedup = [];

  constructor() {
    this.observers = [];
  }

  subscribe(callback) {
    this.dedup.push({ ...callback });
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => {
      console.log(func);
      console.log(observer);

      return observer !== func;
    });
  }

  notify(key) {
    this.dedup.map((observer) => {
      if (observer.key === key) {
        observer.fn();
      }
    });
  }
}
