export enum Level {
    info = "info",
    warning = "warning",
    error = "error",
    success = "success"
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export class Alert {

    message: String;
    level: Level;
    id: string;

    constructor(message: String, level: Level) {
        this.message = message;
        this.level = level;
        this.id = uuidv4();
    }

    isInfo(): Boolean {
        return this.level === Level.info;
    }

    isWarning(): Boolean {
        return this.level === Level.warning;
    }

    isError(): Boolean {
        return this.level === Level.error;
    }

    isSuccess(): Boolean {
        return this.level === Level.success;
    }

}