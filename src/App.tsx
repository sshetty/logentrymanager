import { useEffect, useState } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LogEntryForm, { LogEntry } from './components/LogEntryForm';
import LogEntriesTable from './components/LogEntriesTable';
import { fetchLogEntries, deleteLogEntry } from './utils';

function App() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [isEntryFormOpen, setIsEntryFormOpen] = useState<boolean>(false);
  const [entryFormData, setEntryFormData] = useState<LogEntry>({} as LogEntry);
  const [userName, setUserName] = useState<string>('');

  const openLogEntryForm = (data: LogEntry) => {
    setEntryFormData(data);
    setIsEntryFormOpen(true);
  };

  const closeEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  const updateLogEntries = async (logEntry: LogEntry, type: string) => {
    if(type === 'update') {
      setLogEntries(
        logEntries.map((entry) => {
          if (entry.id === logEntry.id) {
            return { ...entry, ...logEntry };
          }
          return entry;
        })
      );
    } else {
      setLogEntries([...logEntries, logEntry]);
      setUserName(logEntry.userName);
    }
    
    setIsEntryFormOpen(false);
  };

  const handleDeleteClicked = async (logEntry: LogEntry) => {
    await deleteLogEntry(logEntry);

    const updatedLogEntries = logEntries.filter((entry) => entry.id !== logEntry.id);
    setLogEntries(updatedLogEntries); 
  };

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await fetchLogEntries();
      setLogEntries(entries);
    };
    fetchEntries();
  }, []);

  const OpenEntryFormButton: React.FC = () => {  
    const handleClick = async () => {           
      openLogEntryForm({userName, description: '', dateOfEvent: '', location: '', id: ''} as LogEntry);
    };

    return (
      <Button variant="contained" onClick={handleClick} sx={{ marginBottom: '20px' }}>Create new log entry</Button>
    );
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, padding: 2 }}>
          Log Entry Manager
        </Typography>
      </AppBar>
      <main>
        <OpenEntryFormButton />
        { isEntryFormOpen && (
          <LogEntryForm isOpen={isEntryFormOpen} logEntry={entryFormData} onClose={closeEntryForm} updateLogEntries={updateLogEntries}/>
        )}
        <LogEntriesTable logEntries={logEntries} openLogEntryForm={openLogEntryForm} handleDeleteClicked={handleDeleteClicked} />
      </main>
    </div>
  );
}

export default App;