type Level = 'info' | 'error'

function write(level: Level, message: string, context?: Record<string, unknown>) {
  const line = JSON.stringify({ level, message, context, timestamp: new Date().toISOString() })
  if (level === 'error') {
    console.error(line)
  } else {
    console.log(line)
  }
}

export const log = {
  info: (message: string, context?: Record<string, unknown>) => write('info', message, context),
  error: (message: string, context?: Record<string, unknown>) => write('error', message, context),
}
