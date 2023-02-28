import React, { useState, useEffect } from 'react'
import { Form, Alert } from "react-bootstrap"
import { Formik } from 'formik'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie'

import '../styles/registro.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {

  const cookie = new Cookies()
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const url = 'https://63aef0e2649c73f572b11e58.mockapi.io/api/v1/usuarios2'

  const iniciarSesion = async (data) => {
    await axios.get(url, { params: { email: data.email } })
      .then(resp => {
        return resp.data
      })
      .then(resp => {
        if (resp.length > 0) {
          if (resp[0].contra !== data.contra) {
            setError('Contraseña incorrecta')
            setTimeout(() => setError(null), 5000)
          } else {
            setError(null)
            cookie.set('id', resp[0].id, { path: '/' })
            cookie.set('nombre', resp[0].nombre, { path: '/' })
            cookie.set('email', resp[0].email, { path: '/' })
            cookie.set('cedula', resp[0].cedula, { path: '/' })
            navigate('/home')
          }
        } else {
          setError('Correo incorrecto')
          setTimeout(() => setError(null), 5000)
        }
      })
      .catch(error => {
        console.log(error)
      })
  };

  useEffect(() => {
    if (cookie.get('nombre')){
      navigate('/home')
    }
  }, [])

  return (
    <div className='container'>
      <Formik
        initialValues={{
          email: '',
          contra: ''
        }}

        validate={(data) => {
          let errores = {}

          // validacion del correo
          if (!data.email) {
            errores.email = 'Por favor ingresa tu Correo'
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(data.email)) {
            errores.email = 'El correo solo puede tener letras, numeros, puntos, guiones y guion bajo. '
          }

          // validar contraseña
          if (!data.contra) {
            errores.contra = 'Por favor ingresa una contraseña'
          } else if (!/^.{6,16}$/.test(data.contra)) {
            errores.contra = 'La contrseña debe tener minimo 6 caracteres y maximo 16'
          }

          return errores
        }}
        onSubmit={(data, { resetForm }) => {

          iniciarSesion(data);

          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
          <Form className='form' onSubmit={handleSubmit}>
            <h2>Iniciar Sesion</h2>


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

            <button type="submit" className='boton-registrar'>
              Login
            </button>
            {error &&
              <div className="alert alert-danger">
                {error}
              </div>
            }
            <div className='alert'>
              <p> Si no tienes cuenta puedes registrarte haciendo{' '}
                <Alert.Link className='link' onClick={() => navigate('/registro')} >
                  click aqui.
                </Alert.Link>
              </p>
            </div>
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default Login