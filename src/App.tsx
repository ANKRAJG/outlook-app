
import './App.css';
import Home from './components/Home';
import { OutlookProvider } from './providers/OutlookProvider';

function App() {
  return (
    <div className="App">
      <OutlookProvider>
        <Home />
      </OutlookProvider>
    </div>
  );
}

export default App;
