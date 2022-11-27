import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import userReducer from './slices/user.slice';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
//   whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
});

export { rootPersistConfig, rootReducer };
