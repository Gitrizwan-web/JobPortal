import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobslice from "./JobSlice";
import applicationSlice from "./applicationSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import companySlice from "./companySlice";
// Config for Redux Persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobslice,
  company: companySlice,
  application: applicationSlice,
});

// Apply Redux Persist to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux Store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
