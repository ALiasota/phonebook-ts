import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Contact } from '../../types/stateTypes'
import { RootState } from '../store';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {      
      const token = (getState() as RootState).auth.token;
      if(typeof token === 'string') {
        headers.set('Authorization', token);        
      }     
      return headers; 
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: build => ({
    fetchContacts: build.query<Contact[], undefined>({
      query: () => `/contacts`,
      providesTags: ['Contacts'],
    }),
    addContact: build.mutation({
      query: newContact => ({
        url: `/contacts`,
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    delContact: build.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    changeContact: build.mutation({
      query: ({ changedId, name, number }) => ({
        url: `/contacts/${changedId}`,
        method: 'PATCH',
        body: { name, number },
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useDelContactMutation,
  useAddContactMutation,
  useChangeContactMutation,
} = contactsApi;
