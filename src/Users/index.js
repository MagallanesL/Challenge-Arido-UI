import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Peticiones() {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    await axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setUsuarios(response.data);
        setTablaUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registroPost = async () => {
    await axios
      .post("http://localhost:3000/api/users", this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filter(e.target.value);
  };

  const filter = (terminoBusqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.company.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  };

  useEffect(() => {
    peticionGet();
    registroPost();
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Peticiones;
