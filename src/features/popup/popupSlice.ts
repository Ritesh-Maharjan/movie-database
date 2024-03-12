import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PopupState {
  displayText: string,
  displayStatus: "add" | "remove",
}

const initialState: PopupState[] = []

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    addPopup: (state,action: PayloadAction<PopupState>) => {
      return [...state, action.payload];
    },
    removePopup: (state) => {
      // creating a shallow copy of the exisiting array, so that we can remove the first item of popup
      return state.slice(1);
    },
  },    
})

// Action creators are generated for each case reducer function
export const { addPopup,removePopup } = popupSlice.actions

export default popupSlice.reducer