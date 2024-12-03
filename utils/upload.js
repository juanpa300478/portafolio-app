import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.slice(0, file.originalname.lastIndexOf('.')).replaceAll(' ', '-') + '-' + Date.now() + '.jpg')
  }
})

const upload = multer({ storage })
export const up = upload.fields([
  {
    name: 'image1',
    maxCount: 1
  },
  {
    name: 'image2',
    maxCount: 1
  },
  {
    name: 'image3',
    maxCount: 1
  }
])
