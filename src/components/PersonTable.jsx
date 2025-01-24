import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Button, Modal } from 'react-bootstrap';

const PeopleTable = () => {
    const [people, setPeople] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(100);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [details, setDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const persons = [
        { id: 1, nombre: "John Doe", paterno: "1234567890", materno: "Calle Falsa 123" },
        { id: 2, nombre: "Jane Smith", paterno: "9876543210", materno: "Avenida Siempre Viva 456" },
      ];
    const token = localStorage.getItem('authToken'); // recupera el token Oauth

    // Ejecuta la carga de la lista cada vez que se actualiza la pagina   
    useEffect(() => {
        fetchPeople(page);
    }, [page]);

    // Petición de la lista de usuarios
    const fetchPeople = async (page) => {
        try {
            const response = await axios.get('http://localhost:8000/api/upload/people', {
                params: { page, pageSize },
                headers: {
                    'Authorization': `Bearer ${token}`  // Incluye el token en los encabezados
                }
            });
            setPeople(response.data.data);
            setTotalRecords(response.data.totalRecords);
        } catch (error) {
            console.error('Error fetching people:', error);
            setPeople(persons);
        }
    };
    // Petición de detalle de la persona seleccionada
    const fetchDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/upload/people/${id}/details`,{
                params: { page, pageSize },
                headers: {
                    'Authorization': `Bearer ${token}`  // Incluye el token en los encabezados
                }
            });
            setDetails(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

  return (
    <div className="container mt-5">
        <h1 className="text-center">Personas</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {people.map((person) => (
                <tr key={person.id}>
                    <td>{person.nombre}</td>
                    <td>{person.paterno}</td>
                    <td>{person.materno}</td>
                    <td>
                        <Button variant="info" onClick={() => fetchDetails(person.id)}>
                            Ver Detalles
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>

        <Pagination className="justify-content-center">
            {[...Array(Math.ceil(totalRecords / pageSize))].map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === page} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
            </Pagination.Item>
            ))}
        </Pagination>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {details ? (
                    <>
                    <h5>Teléfonos</h5>
                    <ul>
                        {details.phones.map((phone) => (
                        <li key={phone.id}>{phone.phone}</li>
                        ))}
                    </ul>
                    <h5>Direcciones</h5>
                    <ul>
                        {details.addresses.map((address) => (
                        <li key={address.id}>
                            {address.calle}, {address.numero_exterior}, {address.colonia} - {address.cp}
                        </li>
                        ))}
                    </ul>
                    </>
                ) : (
                    <p>Cargando...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default PeopleTable;
