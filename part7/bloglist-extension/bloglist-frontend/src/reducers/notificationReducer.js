import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: null,
    },
    reducers: {
        setNotification(state, action){
            state.message= action.payload.message
        },
        removeNotification(state){
            state.message= null
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const setNotificationWithDuration = (message, duration) => (dispatch) => {
    dispatch(setNotification({ message }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, duration * 1000);
  };

export default notificationSlice.reducer;