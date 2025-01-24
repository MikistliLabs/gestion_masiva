import React from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileUpload() {
  const token = localStorage.getItem('authToken'); // recupera el token Oauth
  
  // Manejamos el drop del archivo y se envia la petición para procesar el archivo
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    try {
      await axios.post('http://127.0.0.1:8000/api/upload/upload-excel', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      alert('Archivo cargado correctamente.');
    } catch (error) {
      alert('Error al cargar el archivo.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.csv' });

  return (
    <div {...getRootProps()} className="border p-3 mb-4 text-center" style={{ cursor: 'pointer' }}>
      <input {...getInputProps()} />
      <p>Arrastra y suelta un archivo CSV aquí, o haz clic para seleccionar uno.</p>
    </div>
  );
}

export default FileUpload;
