import { LogEntryWithoutId, LogEntry } from '../components/LogEntryForm';

// This file contains utility functions to interact with the backend API.
// This could become a service in the future

// Create new log entry
export const createNewLogEntry = async (data: LogEntryWithoutId) => {
	const res = await fetch(
		"http://localhost:8080/logEntries", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				data,
			}),
		}
	);
	return await res.json();
	
};

// Fetch all log entries
export const fetchLogEntries = async () => {
	const res = await fetch(
		"http://localhost:8080/logEntries", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return await res.json();
};

// Update log entry
export const updateLogEntry = async (data: LogEntry) => {
	const res = await fetch(
		`http://localhost:8080/logEntries/${data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
      body: JSON.stringify({
				data,
			}),
		}
	);
	return await res.json();
};

// Delete log entry
export const deleteLogEntry = async (data: LogEntry) => {
	const res = await fetch(
		`http://localhost:8080/logEntries/${data.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return await res.json();
};

