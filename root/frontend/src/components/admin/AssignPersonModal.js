import React, { useState, useEffect } from 'react';
import '../../assets/styles/AssignPersonModal.css';

const AssignPersonModal = ({ closeModal, order }) => {  // Receive props from parent component
    const host = "http://localhost:5000";
    const [assignedPersons, setAssignedPersons] = useState([]);
    const [personName, setPersonName] = useState('');
    const [role, setRole] = useState('');
    const [exposingPrize, setExposingPrize] = useState('');

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            const response = await fetch(`${host}/fetchorder`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            // Update assignedPersons based on fetched orders
            const existingOrder = data.find(o => o._id === order._id);
            if (existingOrder) {
                setAssignedPersons(existingOrder.assignedPersons || []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Fetch orders when the modal opens
    useEffect(() => {
        fetchOrders();
    }, [order]);

    // Function to assign a person
    const assignPerson = (person) => {
        setAssignedPersons([...assignedPersons, person]);
    };

    // Function to unassign a person
    const unassignPerson = async (index) => {
        const personToRemove = assignedPersons[index];
        
        try {
            const response = await fetch(`${host}/admin/order/assigndelete/${order._id}/${personToRemove._id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete assigned person');
            }

            // Remove person from the local state
            const updatedPersons = assignedPersons.filter((_, i) => i !== index);
            setAssignedPersons(updatedPersons);
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    // Handle the form submission to assign a person
    const handleAssignPerson = () => {
        if (personName && role && exposingPrize) {
            assignPerson({ name: personName, role, exposingPrize });
            setPersonName('');
            setRole('');
            setExposingPrize('');
        }
    };

    const submitAssignedPersons = async () => {
        try {
            const response = await fetch(`${host}/admin/order/${order._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({
                    assignedPersons,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update assigned persons');
            }

            const data = await response.json();
            console.log('Response:', data);
            closeModal(); // Close the modal after successful assignment
        } catch (error) {
            console.error('Error assigning persons:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={closeModal}>X</button>
                <h2>Assign Persons for {order?.event}</h2>

                <div className="assigned-persons-list">
                    {assignedPersons.map((person, index) => (
                        <div key={index} className="assigned-person">
                            <p><strong>Name:</strong> {person.name}</p>
                            <p><strong>Role:</strong> {person.role}</p>
                            <p><strong>Exposing Prize:</strong> {person.exposingPrize}</p>
                            <button className="delete-person" onClick={() => unassignPerson(index)}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="assign-person-form">
                    <input 
                        type="text" 
                        placeholder="Person Name" 
                        value={personName} 
                        onChange={(e) => setPersonName(e.target.value)} 
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{
                            backgroundColor: "white",
                            color: role === "" ? "grey" : "black",  // grey when not selected, black when selected
                            width: "106%",
                        }}
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="Photographer">Photographer</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Exposing Prize" 
                        value={exposingPrize} 
                        onChange={(e) => setExposingPrize(e.target.value)} 
                    />
                    <button className="assign-btn" onClick={handleAssignPerson}>Assign</button>
                </div>

                <button className="submit-btn" onClick={submitAssignedPersons}>Submit Assignments</button>
            </div>
        </div>
    );
};

export default AssignPersonModal;
