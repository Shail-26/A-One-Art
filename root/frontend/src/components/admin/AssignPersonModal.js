import React, { useState } from 'react';
import '../../assets/styles/AssignPersonModal.css';

const AssignPersonModal = ({ closeModal, order }) => {  // Receive props from parent component
    const [assignedPersons, setAssignedPersons] = useState([]);
    const [personName, setPersonName] = useState('');
    const [role, setRole] = useState('');
    const [exposingPrize, setExposingPrize] = useState('');

    // Function to assign a person
    const assignPerson = (person) => {
        setAssignedPersons([...assignedPersons, person]);
    };

    // Function to unassign a person
    const unassignPerson = (index) => {
        const updatedPersons = assignedPersons.filter((_, i) => i !== index);
        setAssignedPersons(updatedPersons);
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
                    <input 
                        type="text" 
                        placeholder="Role" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Exposing Prize" 
                        value={exposingPrize} 
                        onChange={(e) => setExposingPrize(e.target.value)} 
                    />
                    <button className="assign-btn" onClick={handleAssignPerson}>Assign</button>
                </div>
            </div>
        </div>
    );
};

export default AssignPersonModal;
