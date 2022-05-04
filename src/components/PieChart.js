import ReactApexCharts from 'react-apexcharts'
import styled from 'styled-components';
import TableData from '../mockData/grouped_findings.json';


export const PieChartComponent = () => {
  let total = TableData.length
  let lowValue = TableData.filter((element) => { return element.severity === "low" }).length/total*100
  let mediumValue = TableData.filter((element) => {return element.severity === "medium"}).length/total*100
  let highValue = TableData.filter((element) => {return element.severity === "high"}).length/total*100
  let criticalValue = TableData.filter((element) => {return element.severity === "critical"}).length/total*100
  
  return (
    <ChartContent>
      <ReactApexCharts
        options={{
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }}
        series={
          [lowValue, mediumValue, highValue, criticalValue]
        }
        type="donut"
      />;
    </ChartContent>
  )
}

const ChartContent = styled.div`
  width: auto;
  padding: auto; 
  display: flex;
  align-items: center;
  justify-content: left;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  )}
`;