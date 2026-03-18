import {SQLITE_SCHEMA_STATEMENTS, SQLITE_TABLES} from '../../database/schema';

export type SqlExecutor = (statement: string, params?: readonly unknown[]) => Promise<void>;

export interface SQLiteBootstrapResult {
  ready: boolean;
  statementsExecuted: number;
  tables: string[];
}

export const initializeSQLiteSchema = async (
  executeSql: SqlExecutor,
): Promise<SQLiteBootstrapResult> => {
  for (const statement of SQLITE_SCHEMA_STATEMENTS) {
    await executeSql(statement);
  }

  return {
    ready: true,
    statementsExecuted: SQLITE_SCHEMA_STATEMENTS.length,
    tables: SQLITE_TABLES,
  };
};