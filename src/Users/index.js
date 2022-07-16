import React from "react";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Peticiones() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [detalles, setDetalles] = useState(false);
  const detallesShow = () => setDetalles(true);
  const handleClose = () => setDetalles(false);
  const [grupos, setGrupos] = useState();

  const verDetalles = (usuario) => {
    verGrupos(usuario.idalias);
    detallesShow();
  };

  const verGrupos = async (idalias) => {
    await axios
      .get(`http://localhost:3000/api/users/${idalias}/grupos`)
      .then((response) => {
        setGrupos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionGet = async () => {
    await axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value);
  };

  const filter = (terminoBusqueda) => {
    var resultadosBusqueda = usuarios.filter((elemento) => {
      return (
        elemento.idalias
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      );
    });
    setUsuarios(resultadosBusqueda);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div className="App">
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Busqueda Por Alias"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Alias</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Detalles</th>
            </tr>
          </thead>

          <tbody>
            {usuarios &&
              usuarios.map((usuario) => (
                <tr key={usuario.idalias}>
                  <td>{usuario.idalias}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.mail}</td>
                  <td>
                    <button
                      variant="success"
                      onClick={() => {
                        verDetalles(usuario);
                      }}
                    >
                      ver
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal show={detalles} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {grupos &&
              grupos.map((grupo) => (
                <div key={grupo.idgroups}>{grupo.groupname}</div>
              ))}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Peticiones;
