import React,{ useState, useEffect } from 'react'
import videoData from './data.json'; // Import the data.json file

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CSmartTable, CCollapse} from '@coreui/react-pro';
import { CChartLine, CChart } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import studentsData from './data.json'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import axios from 'axios'

const Dashboard = () => {
  const [ data, setData ] = useState(null)
  const [ sponsors, setSponsors ] = useState(null)
  const [ genderData, setGenderData ] = useState({
    male: 55,
    female: 20,
    total: 75
  })
  const [ pastMarathon, setPastMarathon ] = useState(null)
  const [ upMarathon, setUpMarathon ] = useState(null)
  const [ locationData, setLocationData ] = useState(null)
  const [details, setDetails] = useState([]);

  const videoViewsData = videoData.students.map((student) => {
    // Calculate the total duration of videos watched by each student
    const totalVideoDuration = student.videosWatched.reduce((total, video) => {
      const durationParts = video.duration.split(' ');
      const durationMinutes = parseInt(durationParts[0], 10);
      total += durationMinutes;
      return total;
    }, 0);

    return totalVideoDuration;
  });

    useEffect(() => {
        axios.get(`https://edumate.glitch.me/pastMarathon/`)
          .then((res) => {
            console.log(res.data.data)
            setPastMarathon(res.data.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
        axios.get(`https://edumate.glitch.me/getmarathon/`)
          .then((res) => {
            console.log(res.data.data)
            setUpMarathon(res.data.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
        axios.get(`https://edumate.glitch.me/getanalyticsmarathon`)
          .then((res) => {
            console.log(res.data)
            setData(res.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
        axios.get(`https://edumate.glitch.me/getSponsors`)
          .then((res) => {
            console.log(res.data.data)
            setSponsors(res.data.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
        axios.get(`https://edumate.glitch.me/getUsers`)
          .then((res) => {
            console.log(res.data)
            setGenderData(prevObject => ({
              ...prevObject,  // Spread the previous state
              male: res.data.male,
              female: res.data.female,
              total: res.data.total // Update the specific property
            }));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
        axios.get(`https://edumate.glitch.me/getlocation`)
          .then((res) => {
            console.log(res.data)
            setLocationData(res.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const columns = [
    {
      key: 'name',
      _style: { width: '20%' },
    },
    'registered',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ];

  const progressExample = [
    { title: 'Chennai', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Delhi', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Mumbai', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'Kolkata', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Pune', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Student 1', value1: 34, value2: 78 },
    { title: 'Student 2', value1: 56, value2: 94 },
    { title: 'Student 3', value1: 12, value2: 67 },
    { title: 'Student 4', value1: 43, value2: 91 },
    { title: 'Student 5', value1: 22, value2: 73 },
    { title: 'Student 6', value1: 53, value2: 45 },
    { title: 'Student 7', value1: 74, value2: 95 },
    { title: 'Student 8', value1: 81, value2: 12 },
    { title: 'Student 9', value1: 66, value2: 45 },
    { title: 'Student 10', value1: 87, value2: 21 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: genderData.male },
    { title: 'Female', icon: cilUserFemale, value: genderData.female },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 12, value: '191' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
  return (
    <>  { genderData !== null && pastMarathon !== null && upMarathon !== null &&
        <WidgetsDropdown users={genderData.total} past={pastMarathon.length} upcoming={upMarathon.length} income={22}/>
    }
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Registrations
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CSmartTable
              activePage={2}
              cleaner
              clickableRows
              columns={columns}
              footer
              items={studentsData.students}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination
              onFilteredItemsChange={(items) => {
                console.log(items);
              }}
              onSelectedItemsChange={(items) => {
                console.log(items);
              }}
              scopedColumns={{
                show_details: (item) => (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.id);
                      }}
                    >
                      {details.includes(item.id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                ),
                details: (item) => (
                  <CCollapse visible={details.includes(item.id)}>
                    <CCardBody className="p-3">
                      <h4>{item.name}</h4>
                      <p className="text-muted">User since: {item.registered}</p>
                      <h5>Test Scores:</h5>
                      <ul>
                        {item.quizzesAttempted.map((quiz) => (
                          <li key={quiz.name}>
                            {quiz.name}: {quiz.score}
                          </li>
                        ))}
                      </ul>
                      <h5>Assignment Scores:</h5>
                      <ul>
                        {item.assignmentsSubmitted.map((assignment) => (
                          <li key={assignment.name}>
                            {assignment.name}: {assignment.score}
                          </li>
                        ))}
                      </ul>
                      <h5>Videos Watched:</h5>
                      <ul>
                        {item.videosWatched.map((video) => (
                          <li key={video.name}>
                            {video.name} - Duration: {video.duration}
                          </li>
                        ))}
                      </ul>
                    </CCardBody>
                  </CCollapse>
                ),
              }}
              selectable
              sorterValue={{ column: 'name', state: 'asc' }}
              tableFilter
              tableProps={{
                className: 'add-this-class',
                responsive: true,
                striped: true,
                hover: true,
              }}
              tableBodyProps={{
                className: 'align-middle',
              }}
            />
          </CRow>
        </CCardBody>
        <CCardFooter>
          {
            locationData ?
            <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
                <CCol className="mb-sm-2 mb-0">
                  <div className="text-medium-emphasis">Mumbai</div>
                  <strong>
                    ({locationData.Mumbai})
                  </strong>
                  <CProgress thin className="mt-2" color="success" value={locationData.Mumbai} />
                </CCol>
                <CCol className="mb-sm-2 mb-0">
                  <div className="text-medium-emphasis">Delhi</div>
                  <strong>
                    ({locationData.Delhi})
                  </strong>
                  <CProgress thin className="mt-2" color="success" value={locationData.Delhi} />
                </CCol>
                <CCol className="mb-sm-2 mb-0">
                  <div className="text-medium-emphasis">Chennai</div>
                  <strong>
                    ({locationData.Chennai})
                  </strong>
                  <CProgress thin className="mt-2" color="success" value={locationData.Kolkata} />
                </CCol>
                <CCol className="mb-sm-2 mb-0">
                  <div className="text-medium-emphasis">Kolkata</div>
                  <strong>
                    ({locationData.Kolkata})
                  </strong>
                  <CProgress thin className="mt-2" color="success" value={locationData.Chennai} />
                </CCol>
                <CCol className="mb-sm-2 mb-0">
                  <div className="text-medium-emphasis">Pune</div>
                  <strong>
                    ({locationData.Pune})
                  </strong>
                  <CProgress thin className="mt-2" color="success" value={locationData.Pune} />
                </CCol>
            </CRow>
            :
            <div>
            </div>
          }
        </CCardFooter>
      </CCard>

      {/* <WidgetsBrand withCharts /> */}

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Students</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Assignments</div>
                        <div className="fs-5 fw-semibold">10</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Quizzes</div>
                        <div className="fs-5 fw-semibold">17</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                {/* <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={12}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Number of Students</div>
                        <div className="fs-5 fw-semibold">10</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol> */}
              </CRow>

              <br />

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Students Watch Duration</CCardHeader>
            <CCardBody>
            <CChart
            type="bar"
            data={{
              labels: videoData.students.map((student, index) => `Student ${index + 1}`),
              datasets: [
                {
                  label: 'Total Video Duration (minutes)',
                  backgroundColor: '#f87979',
                  data: videoViewsData, // Use the calculated video duration data
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: getStyle('--cui-body-color'),
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                  },
                },
                y: {
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                  },
                },
              },
            }}
          />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
