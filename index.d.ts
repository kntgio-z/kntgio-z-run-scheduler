// index.d.ts

import { Connection, ConnectionOptions } from "mysql2";
import { RecurrenceRule } from "node-schedule";

// Define the db.config.js initDB function
declare function initDB(config: ConnectionOptions): Promise<Connection>;

// Define log and err functions from console.js
declare function log(message: string): void;
declare function err(message: string): void;

// Define patterns from cron.js
export declare const patterns: { [key: string]: string };

// Define the types for options and plugins
export interface DBConfig extends ConnectionOptions {
  connectionLimit: number;
}

export interface Plugin {
  interval: string | Date | RecurrenceRule;
  callback: (connection: Connection) => void;
  enable: boolean;
}

export interface Options {
  db: DBConfig;
  plugins: Plugin[];
}

// Declare the runScheduler function
export declare function runScheduler(options: Options): Promise<void>;
