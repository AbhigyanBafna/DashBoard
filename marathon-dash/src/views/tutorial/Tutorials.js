import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CFormCheck
} from '@coreui/react';

const Tutorial = () => {
  const [data, setData] = useState(null);
  const [selectedDisabilities, setSelectedDisabilities] = useState({
    visual: false,
    hearing: false,
    mobility: false,
    intellectual: false,
    mental: false,
  });

  useEffect(() => {
    const selectedDisabilitiesArray = Object.keys(selectedDisabilities).filter(
      (key) => selectedDisabilities[key]
    );

    const queryParameters = selectedDisabilitiesArray.join(' and ');

    axios
      .get(`http://localhost:8000/youtube?keyword=${queryParameters}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedDisabilities]);

  const handleCheckboxChange = (event, disabilityType) => {
    setSelectedDisabilities({
      ...selectedDisabilities,
      [disabilityType]: event.target.checked,
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Search by Impairments:</h4>
      <div className='d-flex flex-wrap gap-3'>
        <CFormCheck 
          id="visual" 
          label="Visual Impairments" 
          checked={selectedDisabilities.visual} 
          onChange={(e) => handleCheckboxChange(e, 'visual')}
        />
        <CFormCheck 
          id="hearing" 
          label="Hearing Impairments" 
          checked={selectedDisabilities.hearing}
          onChange={(e) => handleCheckboxChange(e, 'hearing')}
        />
        <CFormCheck 
          id="mobility"
          label="Mobility Impairments"
          checked={selectedDisabilities.mobility}
          onChange={(e) => handleCheckboxChange(e, 'mobility')}
        />
        <CFormCheck 
          id="intellectual"
          label="Intellectual Impairments"
          checked={selectedDisabilities.intellectual}
          onChange={(e) => handleCheckboxChange(e, 'intellectual')}
        />
        <CFormCheck 
          id="mental"
          label="Mental Disabilities"
          checked={selectedDisabilities.mental}
          onChange={(e) => handleCheckboxChange(e, 'mental')}
        />
      </div>

      <div className='d-flex flex-wrap gap-3 mt-4'>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <CCard key={index} style={{ maxWidth: '18rem' }}>
              <CCardImage orientation='top' src={item.thumbnail} />
              <CCardBody>
                <CCardTitle>{item.title}</CCardTitle>
                <CCardText>
                  Duration: {item.duration_raw}<br />
                  Uploaded: {item.uploaded}<br />
                  Views: {item.views}
                </CCardText>
                <CButton
                  color='primary'
                  target='_blank'
                  rel='noopener noreferrer'
                  href={item.link}
                >
                  Watch Video
                </CButton>
              </CCardBody>
            </CCard>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
