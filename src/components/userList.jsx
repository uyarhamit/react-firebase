import { useEffect, useState } from 'react';
import db from '../connection/firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Table, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserList = ({ users, setUsers, setSelectedUser }) => {

    const usersCollectionRef = collection(db, "users");

    const getUsers = async () => {
        const { docs } = await getDocs(usersCollectionRef);
        setUsers(docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )))
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, 'users', id);
        const index = -1;
        const result = await deleteDoc(userDoc).then(
            setUsers(users.filter(user => user.id !== id))
        ).catch((err) => {
            console.error(err);
        });
    }
    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <Card className='p-5 mt-5'>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>E-Mail</th>
                            <th>Password</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users &&
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td className='d-flex justify-content-around'>
                                        <Button variant='primary' size='sm' onClick={() => setSelectedUser(user)}><FontAwesomeIcon icon={faEdit} /></Button>
                                        <Button variant='danger' size='sm' onClick={() => deleteUser(user.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default UserList