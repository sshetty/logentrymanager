import useTheme from '@mui/system/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogEntriesMobileTable from './LogEntriesMobileTable';
import LogEntriesDesktopTable from './LogEntriesDesktopTable';
import { LogEntry } from './LogEntryForm';

export interface LogEntriesTableProps {
	logEntries: LogEntry[];
  openLogEntryForm: (data: LogEntry) => void;
  handleDeleteClicked: (data: LogEntry) => void;
}

const LogEntriesTable = (props: LogEntriesTableProps) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return isSmScreen ? <LogEntriesMobileTable {...props} /> : <LogEntriesDesktopTable {...props} />;
}

export default LogEntriesTable;