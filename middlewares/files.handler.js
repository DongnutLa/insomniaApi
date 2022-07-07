let fs = require('fs-extra');

const multer = require('multer');
var path = require('path');

const fileHandler = (module) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let path = `public/files/${module}/`;
      fs.mkdirsSync(path);
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, `${module}-${Date.now()}` + path.extname(file.originalname));
    }
  })
  var upload = multer({ storage: storage });
  return upload;
}

module.exports = { fileHandler };
