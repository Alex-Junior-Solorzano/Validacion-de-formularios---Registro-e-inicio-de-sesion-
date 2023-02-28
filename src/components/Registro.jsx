import React, { useState } from 'react'
import { Form } from "react-bootstrap"

import '../styles/registro.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre:'',
    cedula:'',
    email:'',
    contraseña:'',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(usuario)
  }

  const handleInputChange = (event) => {
    //console.log(event.target.name)
    //console.log(event.target.value)
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className='container'>
      <Form className='form' action='' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>Nombre </Form.Label>
          <Form.Control 
            type="text" 
            name= "nombre"
            id='nombre'
            value={usuario.nombre}
            onChange= {handleInputChange}
            placeholder="Ingresa tu Nombre" 
            required />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Numero de Cedula </Form.Label>
          <Form.Control 
            type="text" 
            name= "cedula"
            id='cedula'
            onChange= {handleInputChange}
            value={usuario.cedula}
            placeholder="Ingresa tu Numero de cedula" 
            required />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Email </Form.Label>
          <Form.Control 
            type="email" 
            name= "email"
            id='email'
            onChange= {handleInputChange}
            value={usuario.email}
            placeholder="Ingresa tu email" 
            required />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            name= "contraseña"
            id='contraseña'
            onChange= {handleInputChange}
            value={usuario.contraseña}
            placeholder="Ingresa tu contraseña" 
            required />
        </Form.Group>
        <button  type="submit" className='boton-registrar'>
          Registrarse
        </button>
      </Form>
    </div>
  )
}

export default Registro