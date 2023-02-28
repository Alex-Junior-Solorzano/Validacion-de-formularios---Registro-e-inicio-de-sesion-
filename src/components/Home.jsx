import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/home.css'


const Home = () => {

  const navigate = useNavigate()
  const url = 'https://63aef0e2649c73f572b11e58.mockapi.io/api/v1/usuarios2'
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const fetchUarios = async () => {
    await Axios({
      url: url,
    })
      .then((response) => {
        setTimeout(() => {
          setUsuarios(response.data);
        },);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setBusqueda(event.target.value)
  }

  const handleDelete = async (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        setUsuarios(usuarios.filter(cli => cli.id !== id))
      });
  }

  let resultt = []
  if (!busqueda) {
    resultt = usuarios
  } else {
    resultt = usuarios.filter((dato) =>
      dato.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())
    );
  }

  useEffect(() => {
    fetchUarios()
  }, [])

  return (
    <div className='container'>
      <div className='busqueda'>
      <Form.Control className='mb-4'
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar Cliente"
          onChange={handleInputChange}
        />
      </div>
      <div className='lista '>
        {resultt.map((data) => (
          <div className='itemn ' key={data.id} >
            <label >{data.nombre}</label>
            <div className='botones'>
              <Button className='boton-editar' onClick={() => navigate(`/editar/${data.id}`)}>Editar</Button>
              <Button className='boton-eliminar' onClick={() => handleDelete(data.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home