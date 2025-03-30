// src/components/Patients.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Patients.css";
import PatientCard from "./PatientCard";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "" });
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch patients from backend
    useEffect(() => {
        axios
            .get("http://localhost:5000/patients")
            .then((response) => setPatients(response.data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isEditMode) {
            setSelectedPatient({ ...selectedPatient, [name]: value });
        } else {
            setNewPatient({ ...newPatient, [name]: value });
        }
    };

    // Add a new patient
    const handleAddPatient = (e) => {
        e.preventDefault();
        if (!newPatient.name || !newPatient.age || !newPatient.gender) {
            alert("All fields are required!");
            return;
        }

        axios
            .post("http://localhost:5000/patients/add", newPatient)
            .then((response) => {
                setPatients([...patients, response.data]);
                setNewPatient({ name: "", age: "", gender: "" });
            })
            .catch((error) => console.error("Error adding patient:", error));
    };

    // Update existing patient
    const handleUpdatePatient = (e) => {
        e.preventDefault();
        if (!selectedPatient.name || !selectedPatient.age || !selectedPatient.gender) {
            alert("All fields are required!");
            return;
        }

        axios
            .post(`http://localhost:5000/patients/update/${selectedPatient._id}`, selectedPatient)
            .then(() => {
                setPatients(
                    patients.map((patient) =>
                        patient._id === selectedPatient._id ? selectedPatient : patient
                    )
                );
                setSelectedPatient(null);
                setIsEditMode(false);
            })
            .catch((error) => console.error("Error updating patient:", error));
    };

    // Delete a patient
    const handleDeletePatient = (id) => {
        axios
            .delete(`http://localhost:5000/patients/delete/${id}`)
            .then(() => {
                setPatients(patients.filter((patient) => patient._id !== id));
                setSelectedPatient(null);
                setIsEditMode(false);
            })
            .catch((error) => console.error("Error deleting patient:", error));
    };

    // Set patient for editing
    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setIsEditMode(true);
    };

    return (
        <div className="patient-main">
            <div className="form-sections">
                <h4>{isEditMode ? "Edit Patient" : "Add New Patient"}</h4>
                <form onSubmit={isEditMode ? handleUpdatePatient : handleAddPatient}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={isEditMode ? selectedPatient.name : newPatient.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Age:</label>
                    <input
                        type="text"
                        name="age"
                        value={isEditMode ? selectedPatient.age : newPatient.age}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={isEditMode ? selectedPatient.gender : newPatient.gender}
                        onChange={handleInputChange}
                    />
                    <br />
                    <button type="submit">{isEditMode ? "Update Patient" : "Add Patient"}</button>
                </form>
            </div>

            <div className="patients-section">
                <h3 style={{ textAlign: "center" }}>
                    Patients ({patients.length})
                </h3>
                <div className="patient-list">
                    {patients.map((patient) => (
                        <PatientCard
                            key={patient._id}
                            patient={patient}
                            onEdit={handleEditPatient}
                            onDelete={handleDeletePatient}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Patients;
