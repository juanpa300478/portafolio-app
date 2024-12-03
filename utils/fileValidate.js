import { fileKill } from './fileDelete.js'
export function validateFiles ({ files }) {
  const images = {}
  const error = {}
  let isImage1 = false
  let isImage2 = false
  let isImage3 = false

  if (files) {
    if (files.image1) {
      if (files.image1[0].mimetype === 'image/png' || files.image1[0].mimetype === 'image/jpeg' || files.image1[0].mimetype === 'image/jpg') {
        images.image_one = files.image1[0].filename
        isImage1 = true
      } else {
        fileKill({ fileName: files.image1[0].filename })
        error.image1 = { message: 'file one is != image' }
      }
    } else {
      error.image1 = { message: 'file one is *' }
    }

    if (files.image2) {
      if (files.image2[0].mimetype === 'image/png' || files.image2[0].mimetype === 'image/jpeg' || files.image2[0].mimetype === 'image/jpg') {
        images.image_two = files.image2[0].filename
        isImage2 = true
      } else {
        fileKill({ fileName: files.image2[0].filename })
        error.image2 = { message: 'file two is != image' }
      }
    } else {
      error.image2 = { message: 'file two is *' }
    }

    if (files.image3) {
      if (files.image3[0].mimetype === 'image/png' || files.image3[0].mimetype === 'image/jpeg' || files.image3[0].mimetype === 'image/jpg') {
        images.image_three = files.image3[0].filename
        isImage3 = true
      } else {
        fileKill({ fileName: files.image3[0].filename })
        error.image3 = { message: 'file three is != image' }
      }
    } else {
      error.image3 = { message: 'file three is *' }
    }
  } else {
    error.files = { message: 'file not send' }
  }

  if (isImage1 && isImage2 && isImage3) return images
  if (images.image_one) fileKill({ fileName: images.image_one })
  if (images.image_two) fileKill({ fileName: images.image_two })
  if (images.image_three) fileKill({ fileName: images.image_three })
  return { error }
}

export function validatePartialFiles ({ files }) {
  const images = {}
  const error = {}
  let isImage1 = false
  let isImage2 = false
  let isImage3 = false
  let isFiles = false

  if (files) {
    if (files.image1) {
      if (files.image1[0].mimetype === 'image/png' || files.image1[0].mimetype === 'image/jpeg' || files.image1[0].mimetype === 'image/jpg') {
        images.image_one = files.image1[0].filename
        isImage1 = true
      } else {
        fileKill({ fileName: files.image1[0].filename })
        error.image1 = { message: 'file one is != image' }
      }
    }

    if (files.image2) {
      if (files.image2[0].mimetype === 'image/png' || files.image2[0].mimetype === 'image/jpeg' || files.image2[0].mimetype === 'image/jpg') {
        images.image_two = files.image2[0].filename
        isImage2 = true
      } else {
        fileKill({ fileName: files.image2[0].filename })
        error.image2 = { message: 'file two is != image' }
      }
    }

    if (files.image3) {
      if (files.image3[0].mimetype === 'image/png' || files.image3[0].mimetype === 'image/jpeg' || files.image3[0].mimetype === 'image/jpg') {
        images.image_three = files.image3[0].filename
        isImage3 = true
      } else {
        fileKill({ fileName: files.image3[0].filename })
        error.image3 = { message: 'file three is != image' }
      }
    }
  } else {
    isFiles = true
  }

  if (isImage1 || isImage2 || isImage3 || isFiles) return images
  if (images.image_one) fileKill({ fileName: images.image_one })
  if (images.image_two) fileKill({ fileName: images.image_two })
  if (images.image_three) fileKill({ fileName: images.image_three })
  return { error }
}
