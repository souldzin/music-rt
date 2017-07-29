import { createStore } from "redux";
import { rootReducer } from "../ui-state/reducers";

// --- exports -----------
export { createServerStore };

// --- functions ---------
function createServerStore() {
    return createStore(rootReducer);
}
