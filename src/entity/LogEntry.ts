import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class LogEntry {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	userName: string

	@Column()
	description: string

	@Column()
	dateOfEvent: string

	@Column()
	location: string
}