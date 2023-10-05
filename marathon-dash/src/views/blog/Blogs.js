import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CFormCheck,
} from '@coreui/react';

const Blogs = () => {
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

    const searchQuery = `Educational blogs on ${queryParameters} disabilities`;

    axios
      .get(`https://8767-103-246-224-137.ngrok-free.app/scrape?keyword=${searchQuery}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        console.log(data);
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
      <div className="d-flex flex-wrap gap-3">
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

      <div className="d-flex flex-wrap gap-3 mt-4">
        {data && data?.length > 0 ? (
          data?.map((item, index) => (
            <CCard
              key={index}
              style={{ maxWidth: '300px', height: '200px' }}
            >
              <CCardBody>
                <CCardTitle>{item.title}</CCardTitle>
                <CCardText style={{ height: '1rem' }}>
                  Blog by {item.domain}
                </CCardText>
                <CButton
                  color="primary"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Blog
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

export default Blogs;
