import { configureStore } from "@/imports";
import threadsReducer from "@/slices/threadsSlice";
import uiReducer from "@/slices/uiSlice";
import composerReducer from "@/features/composer/store/composerSlice";
import threadLocalReducer from "@/features/thread/store/threadLocalSlice";
import messageLocalReducer from "@/features/message/store/messageLocalSlice";

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
