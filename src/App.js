import './App.css';
import CollapsibleTable from '../src/components/GroupedFindings'
import { PieChartComponent } from './components/PieChart';


function App() {
  return (
    <div className="App">
      <CollapsibleTable />
      <PieChartComponent />
    </div>
  );
}

export default App;
