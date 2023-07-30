import { DataTypes, Sequelize } from 'sequelize';
import type { Migration } from 'src/database/types';

export const up: Migration = async ({ context }) => {
	await context.getQueryInterface().createTable('<%= underscore(tableName) %>', {
		id: {
			type: DataTypes.UUID,
			autoIncrement: false,
			primaryKey: true,
			allowNull: false,
		},

    // Put your columns here...
    
		created_at: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false,
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP'),
		},
		deleted_at: {
			type: DataTypes.DATE,
		},
	});
};

export const down: Migration = async ({ context }) => {
	await context.getQueryInterface().dropTable('<%= underscore(tableName) %>');
};
