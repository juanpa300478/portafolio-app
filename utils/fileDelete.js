import fs from 'node:fs/promises'

export function fileKill ({ fileName }) {
  if (fileName === null) return
  const filePath = `./img/${fileName}`
  fs.unlink(filePath, (err) => {
    if (err) throw err = new Error()
  })
  console.log(`file delete ${fileName}`)
}
