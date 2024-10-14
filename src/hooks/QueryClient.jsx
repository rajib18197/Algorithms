export default class QueryClient {
  cache = {};

  constructor() {
    this.observers = [];
  }

  subscribe(Component) {
    this.observers.push(Component);
  }

  Notify() {
    return (
      <>
        {this.observers.map((ObserverComponent) => (
          <ObserverComponent.NewQueryProvider client={ObserverComponent.client}>
            <ObserverComponent.ChildrenComponent />
          </ObserverComponent.NewQueryProvider>
        ))}
      </>
    );
  }
}
