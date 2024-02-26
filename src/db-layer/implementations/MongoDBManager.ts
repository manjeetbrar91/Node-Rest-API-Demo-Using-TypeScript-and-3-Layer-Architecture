import * as mongoose from "mongoose";
import { ReadPreference } from "mongodb";

export class MongoDBManager {

  private dbUrl: string;

  constructor(dbUrl: string) {
    this.dbUrl = dbUrl;
  }

  private getOptions(): any {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      autoReconnect: true,
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 50, // Maintain up to 10 socket connections
      bufferMaxEntries: 0,
      connectTimeoutMS: 30000, // Give up initial connection after 30 seconds
      socketTimeoutMS: 60000, // Close sockets after 30 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      noDelay: true,
      keepAlive: true,
      keepAliveInitialDelay: 30000,
      j: true, // journal write concern
      loggerLevel: "info",
      appname: "demo-project",
      readPreference: ReadPreference.SECONDARY_PREFERRED,
      w: 1,
      wtimeout: 10000
    };

    return options;
  }

  public connect(): void {
    (<any>mongoose).Promise = Promise;
    mongoose.connect(this.dbUrl, this.getOptions()).then(() => {
      console.log('Database connection successful')
    })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}