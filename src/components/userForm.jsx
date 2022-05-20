import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import db from "../connection/firebase-config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { Button, Row, Form, Col, Card } from "react-bootstrap";
/**
 * Component for showing details of the user form.
 *
 * @component
 * @example
 * const users = [{name:'', surname:'', email:'', password:''}]
 * selectedUser = {id:0, name:'', surname:'', email:'', password:''}
 * setUsers = function();
 * return (
 *   <UserForm users={users} setUsers={setUsers} selectedUser={selectedUser} />
 * )
 */
const UserForm = ({ users, selectedUser, setUsers }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(true);
  const [buttonText, setButtonText] = useState("Save As New");
  const userCollectionRef = collection(db, "users");

  const addUser = async () => {
    try {
      let json = { name, surname, email, password };
      const result = await addDoc(userCollectionRef, json);
      json.id = result.id;
      setUsers((oldUsers) => [...oldUsers, json]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    let id = selectedUser.id;
    let json = { name, surname, email, password };
    const userDoc = doc(db, "users", id);
    const result = await updateDoc(userDoc, json)
      .then(
        setUsers(users.filter((user) => user.id !== id)),
        setUsers((old) => [...old, json])
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const checkBoxControl = () => {
    let text = !newUser ? "Save As New" : "Edit User";
    setNewUser(!newUser);
    setButtonText(text);
  };

  useEffect(() => {
    if (selectedUser.id) {
      setName(selectedUser.name);
      setSurname(selectedUser.surname);
      setEmail(selectedUser.email);
      setPassword(selectedUser.password);
      setNewUser(false);
      setButtonText("Edit User");
    }
  }, [selectedUser]);
  return (
    <>
      <Card className="p-5 mt-5">
        <Row>
          <h1 className="text-center">Add User Form</h1>
        </Row>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mt-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Add New"
                  checked={newUser}
                  onChange={() => checkBoxControl()}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-5">
            <Form.Group className="text-center">
              <Button
                className="w-50"
                variant="success"
                onClick={newUser ? addUser : updateUser}
              >
                {buttonText}
              </Button>
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
UserForm.prototype = {
  users: PropTypes.array.isRequired,
};
UserForm.defaultProps = {
  users: [],
  selectedUser: {},
};
export default UserForm;
