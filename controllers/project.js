import { ProjectModel } from '../models/project.js'
import { validateProject, validatePartialProject } from '../schemas/project.js'
import { fileKill } from '../utils/fileDelete.js'
import { validateFiles, validatePartialFiles } from '../utils/fileValidate.js'

export class ProjectController {
  static async getAll (req, res) {
    const { page } = req.query
    const projects = await ProjectModel.getAll({ page })
    res.status(200).json(projects)
  }

  static async getById (req, res) {
    const { id } = req.params
    try {
      const result = await ProjectModel.getById({ id })
      return res.status(200).json(result)
    } catch (e) {
      return res.status(400).json({ Error: JSON.parse(e.message) })
    }
  }

  static async create (req, res) {
    const resultImg = validateFiles({ files: req.files })

    if (resultImg.error) return res.status(400).json(resultImg.error)
    const resultText = validateProject(req.body)

    if (!resultText.success) {
      fileKill({ fileName: resultImg.image_one })
      fileKill({ fileName: resultImg.image_two })
      fileKill({ fileName: resultImg.image_three })
      return res.status(400).json({ error: JSON.parse(resultText.error.message) })
    }

    const input = { ...resultText.data, ...resultImg }

    try {
      await ProjectModel.create({ input })
      return res.status(200).json({ message: 'project created' })
    } catch (e) {
      return res.status(400).json({ Error: JSON.parse(e.message) })
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialFiles({ files: req.files })
    if (result.error) return res.status(400).json(result)
    const resultUp = validatePartialProject(req.body)
    if (!resultUp.success) {
      // borra las imagenes por que ha ocurrido un error en la data
      if (result.image_one) fileKill({ fileName: result.image_one })
      if (result.image_two) fileKill({ fileName: result.image_two })
      if (result.image_three) fileKill({ fileName: result.image_three })
      return res.status(400).json({ error: JSON.parse(resultUp.error.message) })
    }

    const projectUpdate = { ...resultUp.data, ...result }
    try {
      await ProjectModel.update({ id, input: projectUpdate })
      return res.status(200).json({ message: 'object updated' })
    } catch (e) {
      return res.status(400).json({ message: e.toString() })
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    try {
      await ProjectModel.delete({ id })
      return res.status(200).json({ message: 'project delete' })
    } catch (e) {
      return res.status(400).json({ message: JSON.parse(e.message) })
    }
  }
}
