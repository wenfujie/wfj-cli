const execa = require('execa')

const execCmd = (command, args, cwd, onData, onErr) => {
  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd,
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true
    })
    child.stdout.on('data', buffer => {
      if (onData) {
        onData(buffer)
        // process.stdout.write(buffer)
      }
    })
    child.stderr.on('data', buffer => {
      if (onErr) {
        onErr(buffer)
        // process.stderr.write(buffer)
      }
    })
    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`command failed: ${command} ${args.join(' ')}`))
        return
      }
      resolve()
    })
  })
}

module.exports.default = execCmd

module.exports = execCmd
