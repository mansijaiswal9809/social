import {configureStore} from '@reduxjs/toolkit'
import postReducer from "./reducer/posts"
import userReducer from "./reducer/user"

export const store= configureStore({
    reducer:{
        posts:postReducer,
        user:userReducer
    }
})