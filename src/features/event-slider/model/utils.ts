export const formatCounter = (total: number, current: number) =>
	`${(current + 1).toString().padStart(2, '0')}/${total.toString().padStart(2, '0')}`;