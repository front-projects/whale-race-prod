import { configureStore } from "@reduxjs/toolkit";
import { authReducer, fetchInitialToken } from "./auth-slice";
import { fetchInitialUsers, usersReducer } from "./users-slice";
import { fetchInitialUser, userReducer } from "./user-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    user: userReducer,
  },
});

// const hash = window.location.hash;
// const hashParams = new URLSearchParams(hash.substring(hash.indexOf("?")));
const params = new URLSearchParams(window.location.search);

const login = params.get("data");
const password = params.get("pmain");

store.dispatch(fetchInitialToken({ login, password })).then((token) => {
  store.dispatch(fetchInitialUser(token.payload));
  store.dispatch(fetchInitialUsers(token.payload));
});

export default store;

// ?data=userlogin&pmain=password&lang=en
