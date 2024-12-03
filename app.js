import express, { json } from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { projectsRouter } from './routes/project.js'

const app = express()

app.use(json())
app.use(cors())
// creando una constante __dirname para usarla en ESm
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/img', express.static(path.join(__dirname, './img')))

app.use('/projects', projectsRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
