import { configureStore } from "@/imports";
import threadsReducer from "@/slices/threadsSlice";
import uiReducer from "@/slices/uiSlice";
import composerReducer from "@/slices/composerSlice";
import threadLocalReducer from "@/slices/threadLocalSlice";
import messageLocalReducer from "@/slices/messageLocalSlice";

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    ui: uiReducer,
    composer: composerReducer,
    threadLocal: threadLocalReducer,
    messageLocal: messageLocalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
