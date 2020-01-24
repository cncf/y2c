exports.up = ({ schema }) => {
  return schema.createTable('webhooks', (table) => {
    table.increments();
    table.string('repo');
    table.timestamps(false, true);
  })
};

exports.down = ({ schema }) => schema.dropTable('webhooks')
