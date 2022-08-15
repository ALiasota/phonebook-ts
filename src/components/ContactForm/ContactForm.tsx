import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  useAddContactMutation,
  useFetchContactsQuery,
  useChangeContactMutation,
} from '../../redux/contacts/contacts-slice';
import { contactFormType } from '../../types/componentsTypes';
const ContactForm: React.FC<contactFormType> = ({
  btn = 'Add contact',
  changedName = '',
  changedNumber = '',
  changedId = null,
  closeModal = null,
}) => {
  const [name, setName] = useState(changedName);
  const [number, setNumber] = useState(changedNumber);
  const [addContact, { isLoading: isAdding }] = useAddContactMutation();
  const [changeContact, { isLoading: isChanging }] = useChangeContactMutation();
  const { data } = useFetchContactsQuery();
  const contacts = data;

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();

    if (name === '' || number === '') {
      alert(`Please fill all fields`);
      return;
    }
    if (btn === 'Add contact') {
      if (
        contacts.some(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        alert(`${name} is already in contacts`);
        return;
      }
      addContact({ name, number });
    } else {
      changeContact({ changedId, name, number });
      closeModal();
    }

    setName('');
    setNumber('');
  };

  const handleChangeName = (e:HTMLFormElement):void => {
    setName(e.target.value);
  };

  const handleChangeNumber = (e:HTMLFormElement):void => {
    setNumber(e.target.value);
  };

  return (
    <>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={name}
            onChange={handleChangeName}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number</Form.Label>
          <Form.Control
            name="number"
            value={number}
            onChange={handleChangeNumber}
            type="tel"
            placeholder="Enter number"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isAdding || isChanging ? 'Procesing...' : `${btn}`}
        </Button>
      </Form>
    </>
  );
};


export default ContactForm;
