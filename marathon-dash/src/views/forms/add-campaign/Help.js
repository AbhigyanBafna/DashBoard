import React,{useState, useEffect} from 'react'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CImage,
  CSpinner,
} from '@coreui/react'

import { 
  cilCheckCircle, } from '@coreui/icons'

import { DocsExample } from 'src/components'
import axios from 'axios';

const Help = () => {

  const [ image, setImage ] = useState('');
  const [ prMessage, setPrMessage ] = useState('');
  const [ loader2, setLoader2 ] = useState(false);

  const [ finalText, setFinalText ] = useState(false)

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file-->",file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };


  function generatePoster() {
    setLoader2(true)

    let bodyContent = new FormData();
    bodyContent.append("message", prMessage);
    bodyContent.append("image", image);
    console.log(image)

    fetch("https://f846-103-246-224-137.ngrok-free.app/api/fb", { 
      method: "POST",
      body: bodyContent,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      setLoader2(false);
      setFinalText(true);
      // Handle the data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoader2(false);
      setFinalText(true);
    });

  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Concerns</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Content</CFormLabel>
                <CFormTextarea id="exampleFormControlTextarea1" rows="3" value={prMessage} onChange={(e) => setPrMessage(e.target.value)} ></CFormTextarea>
              </div>
              { finalText ?
                <a href="/#/dashboard">
                  <CButton onClick={generatePoster}>Next</CButton>
                </a>
                :
                  <CButton onClick={generatePoster}>Create</CButton>
              }
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Help
