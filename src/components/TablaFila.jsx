import { useContext } from 'react'
import './TablaFila.scss'
import ProductoContext from '../contexts/ProductoContext'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const TablaFila = ( { producto, setProductoAEditar } ) => {
  const { eliminarProductoContext } = useContext(ProductoContext)

  const handleDelete = async (id) => {
      
      let isDelete = await Swal.fire({
        title: `¿Estas seguro de querer eliminar este producto ${producto.nombre}?`,
        text: '¿Quieres hacerlo?',
        icon: 'pregunta',
        confirmButtonText: 'Cool',
        showCancelButton: true,
        confirmButtonColor: " #E3BDEE",
        cancelButtonColor: "#808080",
        confirmButtonText: "Yes, delete it!"
      })

      if(isDelete.isConfirmed){
        eliminarProductoContext(id)
        Swal.fire('La acción se completó con éxito.', 'success');
    } else {

      return 
    }
  }

  const handleUpdate= (producto) => {
    setProductoAEditar(producto)
  }
  return (
    <tr>
    <td>{producto.nombre}</td>
    <td>{producto.precio}</td>
    <td>{producto.stock}</td>
    <td>{producto.marca}</td>
    <td>{producto.categoria}</td>
    <td>{producto.detalles}</td>
    <td>
      <img id="img-row" src={producto.foto} alt={producto.nombre} />
    </td>
    <td>{producto.envio ? 'SI' : 'NO'}</td>
    <td>
    <button className='tablaFilaEditar' onClick={() => handleUpdate(producto)} >Editar</button>
    <button className='tablaFilaBorrar' onClick={() => handleDelete (producto.id)}>Borrar</button>
    </td>
  </tr>
  )
}

export default TablaFila