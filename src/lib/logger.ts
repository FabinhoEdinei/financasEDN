// Sistema de logs para diagnóstico da aplicação

export interface LogEntry {
  id: string
  timestamp: Date
  level: 'info' | 'success' | 'warning' | 'error'
  category: string
  message: string
  details?: any
  duration?: number
}

class ApplicationLogger {
  private logs: LogEntry[] = []
  private maxLogs = 500

  log(
    level: LogEntry['level'],
    category: string,
    message: string,
    details?: any,
    duration?: number
  ): LogEntry {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      level,
      category,
      message,
      details,
      duration,
    }

    this.logs.push(entry)

    // Manter apenas os últimos X logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Log no console também
    const color =
      level === 'error'
        ? 'color: red'
        : level === 'warning'
          ? 'color: orange'
          : level === 'success'
            ? 'color: green'
            : 'color: blue'

    console.log(
      `%c[${level.toUpperCase()}] ${category}: ${message}`,
      color,
      details
    )

    return entry
  }

  getLogs(): LogEntry[] {
    return this.logs
  }

  getLogsByCategory(category: string): LogEntry[] {
    return this.logs.filter((log) => log.category === category)
  }

  getLogsByLevel(level: LogEntry['level']): LogEntry[] {
    return this.logs.filter((log) => log.level === level)
  }

  getErrorLogs(): LogEntry[] {
    return this.getLogsByLevel('error')
  }

  clearLogs(): void {
    this.logs = []
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }
}

export const appLogger = new ApplicationLogger()
