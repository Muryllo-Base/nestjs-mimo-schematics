import { DataTypes, Sequelize } from 'sequelize';
import type { Migration } from 'src/database/types';

export const up: Migration = async ({ context }) => {
  // Here you can create new tables, alter columns, add index, foreign keys, etc.
  // Don't put seeders here! Generate a seeder for that.
  await context
    .getQueryInterface()
    .createTable('<%= underscore(tableName) %>', {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
      },

      // Put your columns here...

      // The soft delete is already set up, you don't need to change 
      // the columns below (unless you want to add an index to make queries faster).
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
  // Here you can drop or revert the changes made in "up" method.
  // Don't put seeders here! Generate a seeder for that.
  await context.getQueryInterface().dropTable('<%= underscore(tableName) %>');
};
