import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createNewLogEntry, updateLogEntry } from '../utils';

export interface LogEntry {
	id: string;
	userName: string;
	description: string;
	dateOfEvent: string;
	location: string;
}

export type LogEntryWithoutId = Omit<LogEntry, 'id'>;

interface NewLogEntryProps {
	isOpen: boolean;
  logEntry?: LogEntry;
	onClose: () => void;
	updateLogEntries: (data: LogEntry, type: string) => void;
}

const LogEntryForm: React.FC<NewLogEntryProps> = (props: NewLogEntryProps) => {
	const { isOpen, logEntry, onClose, updateLogEntries } = props;

	const [userName, setUserName] = useState(logEntry?.userName || '');
	const [description, setDescription] = useState(logEntry?.description || '');
	const [dateOfEvent, setDateOfEvent] = useState(logEntry?.dateOfEvent || '');
	const [location, setLocation] = useState(logEntry?.location || '');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		if (id === 'userName') setUserName(value);
		if (id === 'description') setDescription(value);
		if (id === 'dateOfEvent') setDateOfEvent(value);
		if (id === 'location') setLocation(value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (userName && description && dateOfEvent && location) {
      if(logEntry?.id)  {
        const updatedLogEntry = await updateLogEntry({ id: logEntry.id, userName, description, dateOfEvent, location });
        updateLogEntries(updatedLogEntry, 'update');
      } else {
        const newLogEntry = await createNewLogEntry({ userName, description, dateOfEvent, location });
        updateLogEntries(newLogEntry, 'new');
      }
		}
	};

	return (
		<>
			<Dialog 
				open={isOpen} 
				onClose={onClose}
				slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit,
          },
        }}
				>
				<DialogTitle>Log Entry</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill out the form below to create or update a log entry.
					</DialogContentText>

					<TextField
						autoFocus
						required
						margin="dense"
						id="userName"
						name="userName"
						label="User Name"
            value={userName}
						type="text"
						fullWidth
						variant="standard"
						onChange={handleChange}
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						id="description"
						name="description"
						label="Description of Event"
            value={description}
						type="text"
						fullWidth
						variant="standard"
						onChange={handleChange}
					/>

					<TextField
						autoFocus
						required
						margin="dense"
						id="dateOfEvent"
						name="dateOfEvent"
						label="Date of Event"
            value={dateOfEvent}
						type="text"
						fullWidth
						variant="standard"
						onChange={handleChange}
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						id="location"
						name="location"
						label="Location of Event"
            value={location}
						type="text"
						fullWidth
						variant="standard"
						onChange={handleChange}
					/>

				</DialogContent>
				<DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
			</Dialog>
		</>
	);
};

export default LogEntryForm;