import Database from '@nozbe/watermelondb/Database';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import logger from '@nozbe/watermelondb/utils/common/logger';
import appSchema from './schema/app';
import migrations from './model/migrations';

import Product from './model/Product';

const dbName = 'gethalal.db';

export default new Database({
  adapter: new SQLiteAdapter({
    dbName,
    schema: appSchema,
    migrations,
  }),
  modelClasses: [Product],
});

if (!__DEV__) {
  logger.silence();
}
