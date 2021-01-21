import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import boardgameApi from "../api/boardgameApi";

const AgeForm = (props) =>
{
  const handleChange = event =>
  {
    const { name, value } = event.target;
    if ( name === 'a' )
    {
      props.setAge(value);
    } else {
      props.setUsername(value);
    }
  }
  return (
<Form id="pollAge">
  <Form.Group controlId="formUser">
    <Form.Label>Username</Form.Label>
    <Form.Control
      name='u'
      value={props.username}
      type="text"
      placeholder="user"
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group controlId="formAge">
    <Form.Label>Age</Form.Label>
    <Form.Control
      name='a'
      value={props.age}
      type="number"
      placeholder="13"
      onChange={handleChange}
    />
  </Form.Group>
</Form>
  )
}

const PollAge = (props) =>
{
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('user');
  const [age, setAge] = useState(13);
  const [doc, setDoc] = useState(undefined);

  const handleShow = () =>
  {
    // fetch mongo data
    boardgameApi.getAge().then(res =>
    {
      console.log(`PollAge.handleShow: res.data: ${JSON.stringify(res.data, null, 2)}`);
      setDoc(res.data);
    }).catch(err => console.log(err));
    // now open dialog
    setShow(true);
  }
  const handleClose = () =>
  {
    setShow(false);
  }
  const handleSubmit = () =>
  {
    doc.u = username;
    doc.a = parseInt(age);
    // handle mongo data change
    boardgameApi.setAge(doc).then(res =>
    {
      const filter = { _id: doc._id };
      boardgameApi.getAge(filter).then(res =>
        {
          setDoc(res.data);
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
    // now close dialog
    setShow(false);
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        poll: {(doc !== undefined) ? doc.age.avg : age}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Age Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AgeForm
            username={username}
            setUsername={setUsername}
            age={age}
            setAge={setAge}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="pollAge" key="submit" type="submit" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default PollAge;