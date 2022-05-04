import DonutChart from 'react-donut-chart';
import styled from 'styled-components';
import TableData from '../mockData/grouped_findings.json';


export const PieChartComponent = () => {
  let total = TableData.length
  let lowValue = TableData.filter((element) => { return element.severity === "low" }).length/total*100
  let mediumValue = TableData.filter((element) => {return element.severity === "medium"}).length/total*100
  let highValue = TableData.filter((element) => {return element.severity === "high"}).length/total*100
  let criticalValue = TableData.filter((element) => {return element.severity === "critical"}).length/total*100
  const reactDonutChartdata = [
    {
      label: "Low",
      value: Math.round(lowValue),
      color: "#A9C988"
    },
    {
      label: "Medium",
      value: Math.round(mediumValue),
      color: "#B6CBE8"
    },
    {
      label: "High",
      value: Math.round(highValue),
      color: "#F5C94E"
    },
    {
      label: "Critical",
      value: Math.round(criticalValue),
      color: "#ED8268"
    }
  ];
  const reactDonutChartBackgroundColor = [
    "#A9C988",
    "#B6CBE8",
    "#F5C94E",
    "#ED8268"
  ];
  const reactDonutChartInnerRadius = 0.5;
  const reactDonutChartSelectedOffset = 0.04;
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      console.log(item);
    }
  };
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };
  
  return (
    <ChartContent>
      <DonutChart
        width={500}
        onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
        strokeColor={reactDonutChartStrokeColor}
        data={reactDonutChartdata}
        colors={reactDonutChartBackgroundColor}
        innerRadius={reactDonutChartInnerRadius}
        selectedOffset={reactDonutChartSelectedOffset}
        onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
      />
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
  margin-top: 40px;
  )}
`;