import mysql from 'mysql2/promise'
import { fileKill } from '../utils/fileDelete.js'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'portafoliodb'
})

export class ProjectModel {
  static async getAll ({ page }) {
    if (page) {
      const sql = 'SELECT title, slug, description, image_one, image_two, image_three, git_directory, directory FROM project LIMIT 1 OFFSET ?;'
      const sql2 = 'SELECT COUNT(id) num_project FROM portafoliodb.project;'
      const numPage = Number(page) - 1
      try {
        const [projects] = await connection.query(sql, numPage)
        const [result2] = await connection.query(sql2)
        // retornamos un objeto que contiene un array de objetos para la key "projects", y el numero de proyectos en la base de datos para la key "num_project"
        return { projects, ...result2[0] }
      } catch (e) {
        throw new Error('the do not read date')
      }
    }
    const sql = 'SELECT title, slug, description, image_one, image_two, image_three, git_directory, directory FROM project;'
    try {
      const [result] = await connection.query(sql)
      return result
    } catch (e) {
      throw new Error('the do not read date')
    }
  }

  static async getById ({ id }) {
    const sql = 'SELECT title, slug, description, image_one, image_two, image_three, git_directory, directory FROM project WHERE project.id = ?;'
    try {
      const [project] = await connection.query(sql, id)
      return project
    } catch (e) {
      throw new Error('id not find')
    }
  }

  static async create ({ input }) {
    const { title, description, image_one, image_two, image_three, git_directory, directory } = input
    const [resultId] = await connection.query(
      'SELECT (BIN_TO_UUID(user_id)) id FROM user WHERE user.user_name = "jean paul";'
    )

    const [{ id }] = resultId
    const slug = title.replaceAll(' ', '-')
    const params = [id, title, slug, description, image_one, image_two, image_three, git_directory, directory]

    const sql = 'INSERT INTO project (user_id, title, slug, description, image_one, image_two,image_three, git_directory, directory) VALUE (UUID_TO_BIN(?),?,?,?,?,?,?,?,?);'

    try {
      await connection.query(sql, params)
    } catch (err) {
      throw new Error('do not can resource')
    }
  }

  static async update ({ id, input }) {
    if (input.title) input.slug = input.title.replaceAll(' ', '-')

    const sql1 = 'SELECT title,slug,description,image_one,image_two,image_three,git_directory,directory FROM project WHERE project.id = ?;'
    const sql2 = 'UPDATE project SET title = ?, slug = ?, description = ?, image_one = ?, image_two = ?, image_three = ?, git_directory = ?, directory = ? WHERE id = ?;'

    try {
      const [project] = await connection.query(sql1, [id])
      const updateProject = { ...project[0], ...input }
      const { title, slug, description, image_one, image_two, image_three, git_directory, directory } = updateProject
      const params = [title, slug, description,  image_one, image_two, image_three, git_directory, directory, id]
      console.log(updateProject)
      await connection.query(sql2, params)
      if (input.image_one) fileKill({ fileName: project[0].image_one })
      if (input.image_two) fileKill({ fileName: project[0].image_two })
      if (input.image_three) fileKill({ fileName: project[0].image_three })
    } catch (e) {
      // console.log(e)
      if (input.image_one) fileKill({ fileName: input.image_one })
      if (input.image_two) fileKill({ fileName: input.image_two })
      if (input.image_three) fileKill({ fileName: input.image_three })
      throw new Error('project not updated')
    }
  }

  static async delete ({ id }) {
    const [resultDateImage] = await connection.query(
      'SELECT image_one,image_two,image_three FROM project WHERE project.id = ?;',
      [id]
    )

    try {
      connection.query('DELETE FROM project WHERE project.id = ?;', [id])
      fileKill({ fileName: resultDateImage[0].image_one })
      fileKill({ fileName: resultDateImage[0].image_two })
      fileKill({ fileName: resultDateImage[0].image_three })
    } catch (e) {
      throw new Error('project not deleted')
    }
  }
}
