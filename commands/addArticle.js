const fs = require('fs-extra')

if (process.argv.length !== 3) {
  console.error('引数が不正です。')
  process.exit(1)
}

const articleDirName = process.argv[2]
const filePath = `${__dirname}/../static/posts/${articleDirName}/README.md`

fs.createFile(filePath)
  .then(() => {
    console.log(`article ${articleDirName} is created.`)
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
