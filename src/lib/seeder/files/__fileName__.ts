import type { Seeder } from 'src/database/types';

const Data = [
  {
    id: 'f3a9269c-d19b-4cfe-9b69-08c337f59bf5',
    // Add your column fields here...
  },

  // Add your seeds here...
];

export const up: Seeder = async ({ context }) => {
  // Due to umzug metadatas tracking, one seeder is only run once.
  // Generally, you doesnt need to change this snippet.
  await context
    .getQueryInterface()
    .bulkInsert('<%= underscore(tableName) %>', Data);
};

export const down: Seeder = async ({ context }) => {
  // As long as your seed data contains the id (primary key), 
  // the deletion will work correctly and the seed will be reversible.
  await context
    .getQueryInterface()
    .bulkDelete('<%= underscore(tableName) %>', Data);
};
