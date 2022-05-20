import { useEffect, useState } from "react";
import "./App.css";
import UserForm from "./components/userForm";
import UserList from "./components/userList";
import { Container } from "react-bootstrap";
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  return (
    <>
      <Container>
        <UserForm
          users={users}
          setUsers={setUsers}
          selectedUser={selectedUser}
        />

        <UserList
          users={users}
          setUsers={setUsers}
          setSelectedUser={setSelectedUser}
        />
      </Container>
    </>
  );
}

export default App;
