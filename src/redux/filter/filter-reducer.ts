import { createReducer } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export const changeFilter = createAction('filter');

export const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});
