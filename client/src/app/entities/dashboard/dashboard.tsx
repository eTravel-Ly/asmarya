import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import './dashboard.scss';

// Register required components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement, PointElement, LineController, LineElement);

const Dashboard = () => {
  // Sample static data for charts
  const [lineChartData, setLineChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'المبيعات الشهرية',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const [barChartData, setBarChartData] = useState({
    labels: ['2024-07-16', '2024-07-15', '2024-07-14', '2024-07-13', '2024-07-12', '2024-07-11', '2024-07-10'],
    datasets: [
      {
        label: 'عدد المسجلين كل يوم',
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: ['rgba(229,195,88,0.89)'],
        borderColor: ['rgba(229,195,88,0.89)'],
        borderWidth: 1,
      },
    ],
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ['طالب بالجامعة', 'طالب خارج الجامعة', 'مدرب'],
    datasets: [
      {
        label: 'تصنيف المتدربن',
        data: [300, 50, 100],
        backgroundColor: ['#479644', '#E5C358E2', '#3f3984'],
        hoverBackgroundColor: ['#479644', '#E5C358E2', '#3f3984'],
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: ['علمي', 'ادبي', 'ديني', 'تقنية', 'فنون'],
    datasets: [
      {
        label: 'Pie Chart',
        data: [50, 70, 100, 130, 200],
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4CAF50', // Green
          '#9C27B0', // Purple
        ],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
      },
    ],
  });

  const [counters, setCounters] = useState({
    counter1: 50,
    counter2: 120,
    counter3: 80,
    counter4: 200,
  });

  useEffect(() => {
    // Fetch data or other side effects on component mount
    // For static data, you might not need to fetch anything
  }, []);

  return (
    <div>
      <div>
        <Row>
          <Col xs="12" sm="6" md="3">
            <Card className="counter-card">
              <CardBody>
                <CardTitle tag="h5">
                  <FontAwesomeIcon icon={faDashboard} />
                  عدد الطلبة المسجلين
                </CardTitle>
                <CardText className="fw-bold fs-3">{counters.counter1}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="counter-card">
              <CardBody>
                <CardTitle tag="h5">
                  <FontAwesomeIcon icon={faDashboard}></FontAwesomeIcon>
                  عدد المدربين المسجلين
                </CardTitle>
                <CardText className="fw-bold fs-3">{counters.counter1}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="counter-card">
              <CardBody>
                <CardTitle tag="h5">
                  <FontAwesomeIcon icon={faDashboard}></FontAwesomeIcon>
                  عدد الكتب المتاحة
                </CardTitle>
                <CardText className="fw-bold fs-3">{counters.counter1}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="counter-card">
              <CardBody>
                <CardTitle tag="h5">
                  <FontAwesomeIcon icon={faDashboard}></FontAwesomeIcon>
                  عدد الدورات المتاحة
                </CardTitle>
                <CardText className="fw-bold fs-3">{counters.counter1}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ width: '45%' }}>
          <Line data={lineChartData} />
        </div>
        <div style={{ width: '45%' }}>
          <Bar data={barChartData} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', margin: '60px' }}>
        <div style={{ width: '30%' }}>
          <Doughnut data={doughnutChartData} />
        </div>
        {/*<div style={{width: '30%'}}>*/}
        {/*  /!*<Pie data={pieChartData}/>*!/*/}
        {/*</div>*/}
        <div style={{ width: '30%' }}>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
