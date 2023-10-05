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

const AddCampaign = () => {

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
            <strong>Add Campaign</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">PR message</CFormLabel>
                <CFormTextarea id="exampleFormControlTextarea1" rows="3" value={prMessage} onChange={(e) => setPrMessage(e.target.value)} ></CFormTextarea>
              </div>
              <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Poster</label>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  id="exampleFormControlInput1"
                  onChange={handleImageChange}
                />
              </div>
              {previewImage && (
                <div>
                  <img
                    src={previewImage}
                    alt="poster"
                    className="img-thumbnail"
                    style={{ width: '200px', height: '200px' }}
                  />
                </div>
              )}
            </div>
              <div>
                {
                  loader2 ? <CSpinner color="primary" size='sm' /> : <CIcon icon={cilCheckCircle} customClassName="text-success"  style={{ width: '1rem', height: '1rem' }} />
                }
                Facebook Post
                <br />
              <br />
              { finalText ?
                <a href="/#/dashboard">
                  <CButton onClick={generatePoster}>Next</CButton>
                </a>
                :
                  <CButton onClick={generatePoster}>Create</CButton>
              }
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddCampaign
