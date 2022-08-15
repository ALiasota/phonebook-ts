import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ContactForm from 'components/ContactForm';
import propTypes from 'prop-types';

import { useDelContactMutation } from 'redux/contacts';

const ContactListItem = ({ name, number, id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [delContact, { isLoading: isUpdating }] = useDelContactMutation();

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>
        {name}: {number}
      </span>
      <div>
        <Button className="btn-sm" type="button" onClick={handleShow}>
          Change
        </Button>

        <span> </span>
        <Button className="btn-sm" type="button" onClick={() => delContact(id)}>
          {isUpdating ? 'isDeliting...' : 'Delete'}
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm
            btn="Change contact"
            changedName={name}
            changedNumber={number}
            changedId={id}
            closeModal={handleClose}
          />
        </Modal.Body>
      </Modal>
    </li>
  );
};

ContactListItem.propTypes = {
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
};

export default ContactListItem;
