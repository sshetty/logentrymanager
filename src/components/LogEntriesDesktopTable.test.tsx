import { render, screen } from '@testing-library/react';
import LogEntriesTable from './LogEntriesDesktopTable';
import { LogEntry } from './LogEntryForm';

const logEntries = [
  {
    id: '1',
    userName: 'John Doe',
    description: 'Test log entry',
    dateOfEvent: '2023-10-01',
    location: 'Test Location',
  },
  {
    id: '2',
    userName: 'Jane Smith',
    description: 'Another test log entry',
    dateOfEvent: '2023-10-02',
    location: 'Another Location',
  },
];

const openLogEntryForm = jest.fn();
const handleDeleteClicked = jest.fn();

test('renders log entries desktop table', async () => {
  render(<LogEntriesTable logEntries={logEntries} openLogEntryForm={openLogEntryForm} handleDeleteClicked={handleDeleteClicked} />);

  const rows = await screen.findAllByRole('row');
  expect(rows).toHaveLength(3); // 2 data rows + 1 header row
  // Check if the table headers are rendered
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();
  expect(screen.getByText('Date of Event')).toBeInTheDocument();
  expect(screen.getByText('Location')).toBeInTheDocument();

  // Check if the log entries are rendered
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Test log entry')).toBeInTheDocument();
  expect(screen.getByText('2023-10-01')).toBeInTheDocument();
  expect(screen.getByText('Test Location')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  expect(screen.getByText('Another test log entry')).toBeInTheDocument();
  expect(screen.getByText('2023-10-02')).toBeInTheDocument();
  expect(screen.getByText('Another Location')).toBeInTheDocument();
  // Check if the buttons are rendered
  expect(screen.getAllByText('Update')).toHaveLength(2);
  expect(screen.getAllByText('Delete')).toHaveLength(2);
  // Check if the buttons are clickable
  const updateButtons = screen.getAllByText('Update');
  updateButtons[0].click();
  expect(openLogEntryForm).toHaveBeenCalledWith(logEntries[0]);
  const deleteButtons = screen.getAllByText('Delete');
  deleteButtons[0].click();
  expect(handleDeleteClicked).toHaveBeenCalledWith(logEntries[0]);
  
});

test('render empty log entries table', async () => {
  // Check if the "No records found" message is displayed when there are no log entries
  const emptyLogEntries = [] as LogEntry[];
  render(<LogEntriesTable logEntries={emptyLogEntries} openLogEntryForm={openLogEntryForm} handleDeleteClicked={handleDeleteClicked} />);
  expect(screen.getByText('No records found')).toBeInTheDocument();
  // Check if the log entries are not rendered
  expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  expect(screen.queryByText('Test log entry')).not.toBeInTheDocument();
  expect(screen.queryByText('2023-10-01')).not.toBeInTheDocument();
  expect(screen.queryByText('Test Location')).not.toBeInTheDocument();

});
