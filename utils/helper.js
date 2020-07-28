const path = require('path');
const fs = require('fs');
const rootDir = path.dirname(process.mainModule.filename);
const jsonFilePath = path.join(rootDir,"bookdata","books.json");
exports.getBookListFromJsonFile = (cb)=>{
   fs.readFile(jsonFilePath,(err,bookData)=>{
      if(err){
          return cb(null);
      }
      return cb(JSON.parse(bookData));
   })
};

exports.writeBookListToJsonFile = (newBookData, cb)=>{
      fs.writeFile(jsonFilePath,newBookData,()=>{
        console.log('file written');  
        cb();
      })
}
