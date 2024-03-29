import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './authenticationState';
import productReducer from './product-slice';
import currencyReducer from './currency-slice';
import cartReducer from './cart-slice';
import compareReducer from './compare-slice';
import wishlistReducer from './wishlist-slice';

const persistConfig = {
    key: 'flone',
    version: 1.1,
    storage,
    blacklist: ['product'],
};

const authPersistConfig = {
    key: 'authen',
    storage,
    blacklist: ['authenticated'],
};

export const rootReducer = combineReducers({
    product: productReducer,
    currency: currencyReducer,
    cart: cartReducer,
    compare: compareReducer,
    wishlist: wishlistReducer,
    authentication: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
