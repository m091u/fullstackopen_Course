import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";


store.subscribe(() => console.log("Store updated",store.getState()));

store.dispatch(bugAdded("Bug 1"));

store.dispatch(bugRemoved(1));
store.dispatch(bugResolved(1));

console.log(store.getState());
