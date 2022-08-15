import React
 from 'react';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactsList from '../ContactsList';
const Contacts: React.FC = () => {
  return (
    <>
      <ContactForm />
      <Filter />
      <h1 className="text-primary">Contacts</h1>
      <ContactsList />
    </>
  );
};

export default Contacts;
