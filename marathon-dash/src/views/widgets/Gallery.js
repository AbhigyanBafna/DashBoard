import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
    CCardImage,
    CCardTitle,
    CCardText,
  } from '@coreui/react'
import ReactImg from '../../assets/images/download.png'

function CampaignGallery() {
    const [ data, setData ] = useState(null)
    useEffect(() => {
        axios.get(`https://edumate.glitch.me/all-images/`)
          .then((res) => {
            console.log(res.data)
            setData(res.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className='d-flex gap-2'>
            {data &&
                data.map((item) => (
                    <CCard style={{ width: '18rem' }}>
                        <CCardImage orientation="top" src={item} />
                    </CCard>
                ))
            }
        </div>
    )
}

export default CampaignGallery