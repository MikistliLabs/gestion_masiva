import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function PersonDetail({ show, person, onClose }) {
  if (!person) return null; // Si no hay persona seleccionada, no mostramos nada

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Persona</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {person.id}</p>
        <p><strong>Nombre:</strong> {person.name}</p>
        <p><strong>Teléfono:</strong> {person.phone}</p>
        <p><strong>Dirección:</strong> {person.address}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PersonDetail;
