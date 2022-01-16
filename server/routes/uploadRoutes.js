const path = require('path'); // node js path
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${(file.originalname).toLowerCase()}` // concatenate string to store a new name for image (https://nodejs.org/api/path.html#pathextnamepath - path to the image)
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Only images are allowed!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  const path = req.file
  res.status(200).json(path.filename);
  // res.status(200).json(`/${req.file}`);
});

module.exports = router;
