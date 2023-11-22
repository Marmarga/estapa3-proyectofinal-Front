import { useState } from 'react'
import { post } from '../../utils/http'
import './DragDrop.scss'


const DragDrop = ({ setFoto, setSrcImagen, srcImagen }) => {
    const [dragOver, setDragOver] = useState(false)

    const arrayEventos = ['dragenter' , 'dragleave' , 'dragover', 'drop']
    arrayEventos.forEach(eventName => {
        document.body.addEventListener(eventName, e => e.preventDefault())
    })

    const handleEnter = () => {
        setDragOver(true)

    }
    const handleOver = () => {
        setDragOver(true)
    }
    const handleLeave =()=>{
        setDragOver(false)
    }

    const handleDrop = e => {
        setDragOver(false)
        const dataTransf = e.dataTransfer
        const files = dataTransf.files 
        handleFiles(files)
    }

    const handleChange = e => {
        const files = e.target.files
        handleFiles(files)

    }

    const handleFiles = async files => {
        //console.log ('llegaron las imagenes', files)
        try {
            const file = files[0]
            await uploadFile(file)
            previewFile(file)
        } catch (error) {
            console.error ('[handleFiles', error)
            
        }

    }
    const previewFile = file => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.addEventListener('loadend', () =>{
            setSrcImagen(reader.result)
        })

    }
    const uploadFile = async file => {
        const fomrData = new FormData()

       try {        
        fomrData.append('foto', file)
        const imagenUp = await post('https://etapa3-proyectofinal.onrender.com/api/upload', fomrData)
       // const imagenUp = await post('http://localhost:8082/api/upload', fomrData)
        setFoto(imagenUp)
       } catch (error) {
        console.error('[uploadFile]:', error)
       }

    }
    const dropAreaClass =`drop-area ${dragOver ? 'drag-over' : ''}`

  return (
   
    <div className={dropAreaClass} onDrop={handleDrop} onDragEnter={handleEnter} onDragOver={handleOver} onDragLeave={handleLeave}>
        <p>Subir imagen al servidos <b> file dialog </b> o con <b> drag and drop </b> dentro del area punteada</p>

        <input type="file" id="lbl-foto" accept='image/*' onChange={handleChange}/>
        <label htmlFor="lbl-foto" className='drop-area-button'> 
            File Dialog
        </label>

        <div className="drop-area-image">
        <img src={srcImagen} alt="" />

        </div>

    </div>
  
  )
}

export default DragDrop