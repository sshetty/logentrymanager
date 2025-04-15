import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LogEntriesTableProps } from './LogEntriesTable';

const LogEntriesDesktopTable: React.FC<LogEntriesTableProps> = (props: LogEntriesTableProps) => {
	const { logEntries, openLogEntryForm, handleDeleteClicked } = props;

	return (
		<TableContainer component={Paper}>
      <Table aria-label="Table to display log entries">
				<TableHead>
					<TableRow>
						<TableCell align="right">
							Name
						</TableCell>
						<TableCell align="right">
							Description
						</TableCell>
						<TableCell align="right">
							Date of Event
						</TableCell>
						<TableCell align="right">
							Location
						</TableCell>
						<TableCell align="right">
						</TableCell>
					</TableRow>
				</TableHead>
        <TableBody>
          {logEntries && logEntries.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">
                {row.userName}
              </TableCell>
              <TableCell align="right">
                {row.description}
              </TableCell>
              <TableCell align="right">
                {row.dateOfEvent}
              </TableCell>
							<TableCell align="right">
                {row.location}
              </TableCell>
							<TableCell align="right">
                <Button variant="contained" onClick={() => {openLogEntryForm(row);}}>Update</Button>
								<Button variant="contained" onClick={() => {handleDeleteClicked(row);}} sx={{ marginLeft: '10px'}}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {logEntries.length === 0 && ( <TableRow><TableCell colSpan={5}>No records found</TableCell></TableRow> )}
        </TableBody>
			</Table>
		</TableContainer>
	);
};

export default LogEntriesDesktopTable;