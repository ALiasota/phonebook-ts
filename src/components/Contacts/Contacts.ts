import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactsList from 'components/ContactsList';
const Contacts = () => {
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
