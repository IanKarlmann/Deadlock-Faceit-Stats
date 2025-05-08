const levels = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
  };
  
  function log(level, message) {
    console.log(`[${level}] ${message}`);
  }
  
  export function info(msg) {
    log(levels.INFO, msg);
  }
  
  export function warn(msg) {
    log(levels.WARN, msg);
  }
  
  export function error(msg) {
    log(levels.ERROR, msg);
  }
  