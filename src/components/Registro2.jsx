import React, { useState, useEffect } from 'react'
import { Form, Alert } from "react-bootstrap"
import { Formik } from 'formik'
import { verificarCedula } from 'udv-ec';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import '../styles/registro.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Registro2 = () => {

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contra: '',
    contra2: '',
    cedula: '',
  })

  const [editing, setEditing] = useState(false);
  const [formulario, setFormulario] = useState(false)
  const navigate = useNavigate()
  const params = useParams();

  const url = 'https://63aef0e2649c73f572b11e58.mockapi.io/api/v1/usuarios2'

  const loadUser = async (id) => {
    await axios.get(url, { params: { id: id } })
      .then(resp => {
        setUsuario({
          nombre: resp.data[0].nombre,
          email: resp.data[0].email,
          cedula: resp.data[0].cedula,
          contra: resp.data[0].contra,
          contra2: resp.data[0].contra2
        })
        setEditing(true);
      })
  }

  useEffect(() => {
    if (params.id) {
      loadUser(params.id)
    }
  }, [params.id])

  return (
    <div className='container'>
      <Formik

        initialValues={
          usuario
        }

        validate={(data) => {
          let errores = {}

          // validacion del nombre 
          if (!data.nombre) {
            errores.nombre = 'Por favor ingresa tu nombre'
          } else if (!/^[a-zA-ZÀ-ÿ\s]{4,40}$/.test(data.nombre)) {
            errores.nombre = 'El nombre debe tener al menos 4 letras y solo puede contener letras y espacio '
          }

          // validacion del correo
          if (!data.email) {
            errores.email = 'Por favor ingresa tu Correo'
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(data.email)) {
            errores.email = 'El correo solo puede tener letras, numeros, puntos, guiones y guion bajo. '
          }

          // validar cedula
          if (!data.cedula) {
            errores.cedula = 'Por favor ingresa tu numero de cedula'
          } else if (!verificarCedula(data.cedula)) {
            errores.cedula = 'Por favor ingresa un numero de cedula valido'
          }

          // validar contraseña
          if (!data.contra) {
            errores.contra = 'Por favor ingresa una contraseña'
          } else if (!/^.{6,16}$/.test(data.contra)) {
            errores.contra = 'La contrseña debe tener minimo 6 caracteres y maximo 16'
          }

          // validar contraseña2
          if (!data.contra2) {
            errores.contra2 = 'Por favor vuleve a ingresa la contraseña'
          } else if (!(data.contra === data.contra2)) {
            errores.contra2 = 'La contraseña debe coincidir'
          }

          return errores

        }}
        onSubmit={async (data, { resetForm }) => {
          if (editing) {
            await fetch(`${url}/${params.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
            resetForm();
            setFormulario(true);
            setTimeout(() => setFormulario(false), 5000)
            navigate('/home')
          } else {
            await fetch(url, {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" },
            });
            resetForm();
            setFormulario(true);
            setTimeout(() => setFormulario(false), 5000)
            
          }
        }}
      >
        {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
          <Form className='form' onSubmit={handleSubmit}>
            <h2>{editing ? "Editar datos" : "Formulario de registro"}</h2>
            <Form.Group className="mb-3" >
              <Form.Label>Nombre </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                id='nombre'
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu Nombre"
                required />
              {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Numero de Cedula </Form.Label>
              <Form.Control
                type="text"
                name="cedula"
                id='cedula'
                value={values.cedula}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu Numero de cedula"
                required />
              {touched.cedula && errors.cedula && <div className='error'>{errors.cedula}</div>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                name="email"
                id='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu email"
                required />
              {touched.email && errors.email && <div className='error'>{errors.email}</div>}
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contra"
                id='contra'
                value={values.contra}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu contraseña"
                required />
              {touched.contra && errors.contra && <div className='error'>{errors.contra}</div>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contra2"
                id='contra2'
                value={values.contra2}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Vuleve a ingresa tu contraseña"
                required />
              {touched.contra2 && errors.contra2 && <div className='error'>{errors.contra2}</div>}
            </Form.Group>

            <button type="submit" className='boton-registrar'>
              {editing ? 'Editar' : 'Guardar' }
            </button>
            {editing ? 
              <button onClick={()=> navigate('/home')} className='boton-registrar'>
                Volver
            </button>  : <p></p>
          }
            {formulario && <p className='exito'>Formulario enviado!</p>}
            {editing ?
            <p></p>:
            <div className='alert'>
              <p> Si ya tienes cuenta puedes iniciar sesion haciendo{' '}
                <Alert.Link className='link' onClick={() => navigate('/login')} >
                  click aqui.
                </Alert.Link>
              </p>
            </div>}
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default Registro2