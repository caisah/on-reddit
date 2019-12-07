// const canLog = true
// const storedLogs = []
// const bufferMaxLen = 20
// let buffer = []

// const collectLogsFromBuffer = () => buffer.slice(0, bufferMaxLen).join()

// export const log = async text => {
//   if (canLog) {
//     const line = `${new Date().toTimeString()} - ${text}\n`

//     buffer = buffer.push(line)

//     if (buffer.length === bufferMaxLen) {
//       const data = await storedLogs.getValue()

//       storedLogs.setValue(data + collectLogsFromBuffer())
//       buffer = buffer.slice(bufferMaxLen)
//     }
//   }
// }

// export const getLogs = async () => {
//   const data = await storedLogs.getData()

//   return data + collectLogsFromBuffer()
// }

export const log = (...args) => {
  console.log('[on-reddit]:', ...args)
}

export const setLogging = () => {}
