import mysql from 'mysql2'

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export default class SuspendedRepository {
  static getSupendedDate() : Promise<Date> {
    const connection : mysql.Connection = mysql.createConnection(process.env.DATABASE_URL)

    return new Promise<Date>((resolve, reject) => {
      connection.query(
        'SELECT * FROM H_H_supended',
        function(err, results) {
          const suspended = results[0];
          resolve(new Date(suspended.last_serialization));
          reject(new Date())
        }
      );
    }).finally(() => connection.end())
  }
}