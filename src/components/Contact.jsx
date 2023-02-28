import React, { useState } from 'react'
import { Form } from "react-bootstrap"

import '../styles/registro.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Contact = () => {

  const [envio, setEnvio] = useState({
    titulo:'',
    descripcion:''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleInputChange = (event) => {
    //console.log(event.target.name)
    //console.log(event.target.value)
    setEnvio({
        ...envio,
        [event.target.name]: event.target.value
    })
}

  return (
    <div className='container'>
      <Form className='form' action='' onSubmit={handleSubmit}>
        <h2>Contactanos</h2>
        <Form.Group className="mb-3" >
          <Form.Label>Titulo </Form.Label>
          <Form.Control 
            type="text" 
            name= "titulo"
            id='titulo'
            value={envio.titulo}
            onChange= {handleInputChange}
            placeholder="Ingresa un titulo" 
            required />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Descripcion </Form.Label>
          <Form.Control 
            as="textarea"
            style={{ height: '100px' }}
            name= "descripcion"
            id='descripcion'
            onChange= {handleInputChange}
            value={envio.descripcion}
            placeholder="Ingresa una descripcion" 
            required />
        </Form.Group>
        
        <button  type="submit" className='boton-registrar'>
          Enviar
        </button>
      </Form>
    </div>
  )
}

export default Contact