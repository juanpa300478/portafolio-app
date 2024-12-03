import { Router } from 'express'
import { up } from '../utils/upload.js'
import { ProjectController } from '../controllers/project.js'

// up es el modulo que estamos utilizando para recibir la data de la vista a traves de el protocolo http

export const projectsRouter = Router()

projectsRouter.get('/', ProjectController.getAll)
projectsRouter.post('/', up, ProjectController.create)

projectsRouter.get('/:id', ProjectController.getById)
projectsRouter.patch('/:id', up, ProjectController.update)
projectsRouter.delete('/:id', ProjectController.delete)
