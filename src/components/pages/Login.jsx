import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logoBlue.png';

export const Login = () => {
  
  const navigation = useNavigate();

  const {values, handleSubmit, handleChange} = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async(valuesData) => {  
      
      const {username, password} = valuesData
      
      if(username === '' && password === '') return navigation('/dashboard-huggo')

    }
  })

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='bg-white w-11/12 md:w-2/6 sm:w-2/4 rounded shadow p-10 flex flex-col gap-2'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-12'>
          
          <div className=' flex items-center justify-center'>
            <img src={logo} className='w-3/12' alt="" />
          </div>

          <div className='flex flex-col gap-4'>
            <div>

              <label htmlFor="username">Escribe un nombre de usuario</label>
              <input 
                type="text"
                className='border-[1px] w-full rounded pl-2 py-2 border-[#CCC] text-gray-600'
                placeholder='escribe un nombre de usuario'
                name='username'
                value={values.username}
                onChange={handleChange}
              />
            </div>
            
            <div className='flex flex-col'>
              <label htmlFor="username">Escribe una contraseña</label>
              <input 
                type="password"  
                name='password'
                className='border-[1px] w-full rounded pl-2 py-2 border-[#CCC] text-gray-600'
                placeholder='escribe una contraseña'
                value={values.password}
                onChange={handleChange} 
              />
            </div>
          </div>
          <button
            className='w-full bg-[#0072FF] rounded text-white py-2 hover:bg-[#0053b9] transition-all'
            type='submit'
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
