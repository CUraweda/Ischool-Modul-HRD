import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generatePagination(currentPage: number, maxPage: number): (number | null)[] {
	if (maxPage <= 5) {
		return Array.from({length: maxPage}, (_, i) => i + 1);
	}

	const result: (number | null)[] = [];
	const delta = 2;

	result.push(1);

	if (currentPage > delta + 2) {
		result.push(null);
	}

	for (let i = Math.max(2, currentPage - delta); i < currentPage; i++) {
		result.push(i);
	}

	result.push(currentPage);

	for (let i = currentPage + 1; i <= Math.min(maxPage - 1, currentPage + delta); i++) {
		result.push(i);
	}

	if (currentPage < maxPage - delta - 1) {
		result.push(null);
	}

	result.push(maxPage);

	return result;
}
