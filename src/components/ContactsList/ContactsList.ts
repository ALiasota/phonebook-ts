import { useSelector } from 'react-redux';
import { getFilter } from 'redux/filter/filter-selectors';
import { useFetchContactsQuery } from 'redux/contacts';
import ContactsListItem from '../ContactsListItem';

const ContactsList = () => {
  const { data, isLoading } = useFetchContactsQuery();

  const filter = useSelector(getFilter);
  if (data) {
    const filteredContacts = data.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return isLoading ? (
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    ) : (
      <ul className="list-group">
        {filteredContacts.map(({ id, name, number }) => {
          return (
            <ContactsListItem key={id} id={id} name={name} number={number} />
          );
        })}
      </ul>
    );
  }
};

export default ContactsList;
