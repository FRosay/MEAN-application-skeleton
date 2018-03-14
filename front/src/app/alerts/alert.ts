export enum Level {
    info = "info",
    warning = "warning",
    error = "error",
    success = "success"
}

export class Alert {

    message: String;
    level: Level;
    timeout: any;
    cardinality: number;

    constructor(message: String, level: Level) {
        this.message = message;
        this.level = level;
        this.cardinality = 1;
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

    setTimeOut(filterAlertFunc: any, time) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(filterAlertFunc, time);
    }

    incCardinality() {
        ++this.cardinality;
    }
}