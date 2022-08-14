import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';


export const changeFilter = createAction('filter');

export const filter = createReducer('', {
  changeFilter: (_:any, action: PayloadAction<string> ) => action.payload,
});
