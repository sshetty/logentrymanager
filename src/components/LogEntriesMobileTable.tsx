import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LogEntry } from './LogEntryForm';
import { LogEntriesTableProps } from './LogEntriesTable';

const LogEntriesMobileTable: React.FC<LogEntriesTableProps> = (props: LogEntriesTableProps) => {
	const { logEntries, openLogEntryForm, handleDeleteClicked } = props;

  const renderRow = (row: LogEntry) => {
    return Object.entries(row).map((cell, idx) => {
      if (cell[0] !== 'id') {
        return (
          <>
            <TableCell 
              key={`${cell[0]}-${idx}`}
              sx={{
                display: 'block',
                float: 'left',
                padding: '0.35em',
                width: '49%',
                clear: 'both',
              }}
            >
              {cell[0]}
            </TableCell>
            <TableCell 
              key={idx}
              sx={{
                display: 'block',
                padding: '0.35em',
              }}
            >
              {cell[1]}
            </TableCell>
          </> 
        );
      }
      return null;
    });
  }

  return (
		<TableContainer component={Paper}>
      <Table aria-label="Mobile table to display log entries">
        <TableBody>
          {logEntries && logEntries.map((row) => (
            <TableRow 
              key={row.id}
              sx={{
                display: 'block',
                borderBottom: '2px solid #F1F1F1'
              }}
              >
              {
                renderRow(row)
              }
              <TableCell>
                <Button variant="contained" onClick={() => {openLogEntryForm(row);}}>Update</Button>
                <Button variant="contained" onClick={() => {handleDeleteClicked(row);}} sx={{ marginLeft: '10px'}}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LogEntriesMobileTable;