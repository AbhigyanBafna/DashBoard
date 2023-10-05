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

  const [ eventName, setEventName ] = useState('');
  const [ date, setDate ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ contact, setContact ] = useState('');
  const [ volunter, setVolunter ] = useState('');
  const [ poster, setPoster ] = useState('');
  const [ prMessage, setPrMessage ] = useState('');

  const [ loader1, setLoader1 ] = useState(false);
  const [ loader2, setLoader2 ] = useState(false);
  const [ loader3, setLoader3 ] = useState(false);

  const [ finalText, setFinalText ] = useState(false)

  function generatePoster() {
    setLoader1(true)
    setLoader2(true)
    setLoader3(true)
    axios.post(`http://192.168.88.217:80/createPoster/${eventName}/${date}/${location}/${contact}/${volunter}/`)
      .then((res) => {
        console.log(res)
        setPoster(res.data.url)
        setPrMessage(res.data.prMessage)
        console.log(prMessage)
        setFinalText("Next")
        setLoader1(false)
        setLoader2(false)
        setLoader3(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
                <CFormLabel htmlFor="exampleFormControlInput1">Event Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Name of the event"
                  onChange={(event) => setEventName(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Date</CFormLabel>
                <div>
                  <input type="date" id="exampleFormControlInput1" onChange={(event) => setDate(event.target.value)}/>
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Location</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Location of the event"
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Contact Number</CFormLabel>
                <CFormInput
                  className="w-25"
                  type="number"
                  id="exampleFormControlInput1"
                  placeholder="+91 00000 00000"
                  onChange={(event) => setContact(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Number of Volunteers</CFormLabel>
                <CFormInput
                  className="w-25"
                  type="number"
                  id="exampleFormControlInput1"
                  placeholder="100-200"
                  onChange={(event) => setVolunter(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Poster</CFormLabel>
                <div>
                  <CImage
                    rounded
                    thumbnail
                    src={poster}
                    alt="poster"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">PR message</CFormLabel>
                <CFormTextarea id="exampleFormControlTextarea1" rows="3" value={prMessage} onChange={(e) => setPrMessage(e.target.value)} ></CFormTextarea>
              </div>
              <div>
                {
                  loader1 ? <CSpinner color="primary" size='sm' /> : <CIcon icon={cilCheckCircle} customClassName="text-success"  style={{ width: '1rem', height: '1rem' }} />
                }
                Sponsor Emails
                <br />
                {
                  loader2 ? <CSpinner color="primary" size='sm' /> : <CIcon icon={cilCheckCircle} customClassName="text-success"  style={{ width: '1rem', height: '1rem' }} />
                }
                Facebook Post
                <br />
                {
                  loader3 ? <CSpinner color="primary" size='sm' /> : <CIcon icon={cilCheckCircle} customClassName="text-success"  style={{ width: '1rem', height: '1rem' }} />
                }
                Volunteer Notification
              <br />
              { finalText ?
                <a href="/#/view">
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
