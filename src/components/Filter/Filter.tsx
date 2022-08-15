import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { changeFilter } from 'redux/filter/filter-reducer';
import { getFilter } from 'redux/filter/filter-selectors';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <Form.Group className="mb-3 mt-3">
      <Form.Label>Find contacts by name</Form.Label>
      <Form.Control
        name="filter"
        value={filter}
        onChange={e => dispatch(changeFilter(e.target.value))}
        type="text"
        placeholder="Enter name"
      />
    </Form.Group>
  );
};

export default Filter;
