import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css'
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureChart = () => {
  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: []
  });

  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            weight: 'bold',
            size: 16,
          },
          color: 'black',
        },
        grid: {
          color: 'black',
        }
      },
      y: {
        ticks: {
          font: {
            weight: 'bold',
            size: 16,
          },
          color: 'black',
        },
        grid: {
          color: 'black',
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Weather Today',
        font: {
          weight: 'bold',
          size: 20,
        },
        color: 'black',
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            weight: 'bold',
            size : 16,
          },
          color: 'black',
        },
      },
    },
  };
  const fetchTemperatureData = () => {
    fetch('http://localhost:3003/temperature')
      .then((response) => response.json())
      .then((responseObj) => {
        if (!Array.isArray(responseObj.data)) {
          console.error('Expected data to be an array but got:', typeof responseObj.data);
          return; // Early return or handle the error appropriately
        }
        const labels = responseObj.data.map((item) => new Date(item.Date).toLocaleString());
        const temperatureData = responseObj.data.map((item) => item.Temperature);
        const humidityData = responseObj.data.map((item) => item.Humidity);

        setChartData({
          labels,
          datasets: [
            { label: 'Temperature', data: temperatureData, borderColor: 'rgb(255, 99, 132)', backgroundColor: 'rgba(255, 99, 132, 0.5)', borderwidth: 3},
            { label: 'Humidity', data: humidityData, borderColor: 'rgb(54, 162, 235)', backgroundColor: 'rgba(54, 162, 235, 0.5)', borderwidth: 3}
          ]
        });
      });
  };
  React.useEffect(() => {
    fetchTemperatureData();
    const ws= new WebSocket('ws://localhost:3005');
    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
    };
    ws.onmessage = (message) => {
      console.log('received:', message.data);
      fetchTemperatureData();
    };
  }, []);
  return <Line data={chartData} options={options} />;
};

class App extends Component {
  render() {  
    return (
      <div className="App">
        <TemperatureChart />
      </div>
    );
  }
}

export default App;