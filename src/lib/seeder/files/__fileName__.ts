import type { Migration } from 'src/database/types';

const Data = [
	{ 
		id: 'f3a9269c-d19b-4cfe-9b69-08c337f59bf5', 
		// Add your column fields here...
	},

	// Add your seeds here...
];

export const up: Migration = async ({ context }) => {
	await context.getQueryInterface().bulkInsert('<%= underscore(tableName) %>', Data);
};

export const down: Migration = async ({ context }) => {
	await context.getQueryInterface().bulkDelete('<%= underscore(tableName) %>', Data);
};
