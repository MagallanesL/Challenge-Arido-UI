import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

export default function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Alias, setAlias] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const agregarUsuario = async () => {
    await axios.post("http://localhost:3000/api/users", {
      idalias: Alias,
      nombre: nombre,
      mail: correo,
      Password: password,
    });
    handleClose();
  };

  return (
    <>
      <div className="button" align="center">
        <Button variant="success" onClick={handleShow}>
          Nuevo
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Alias</Form.Label>
              <Form.Control
                type="email"
                placeholder="Por ejemplo: Roblox"
                autoFocus
                onChange={(e) => setAlias(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="Texto"
                placeholder="Lisandro Magallanes"
                autoFocus
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancerlar
          </Button>
          <Button variant="primary" onClick={(e) => agregarUsuario(e)}>
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
