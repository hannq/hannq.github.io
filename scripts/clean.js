/**
 * @author hannq
 * @copyright hannq 2020-1-8
 * @file clean branch master for Github Page ... 
 **/

// @ts-check

const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');

/** 不需要删除的白名单或者文件名 */
const WHITE_LIST = [
  '.cache',
  '.git',
  '.gitignore',
  'package.json',
  'readme.md',
  'public',
  'scripts'
];

/** 项目根目录 */
const PROJECT_ROOT_PATH = path.join(__dirname, '../');

;(async function() {
  /** 根目录下的文件名列表 */
  const filenameList = await fse.readdir(PROJECT_ROOT_PATH);
  await Promise.all(filenameList
    .filter(filename => !WHITE_LIST.includes(filename))
    .map(filename => fse.remove(path.join(PROJECT_ROOT_PATH, filename))))
    
  // console.log();
  /** @type { string[] } 符合条件的文件名 */
  // const matches = await new Promise((resolve, reject) => {
  //   glob(
  //     './!(scripts|node_modules|public)/*',
  //     {
  //       cwd: __dirname,
  //     },
  //     (err, matches) => {
  //       if (!err) {
  //         resolve(matches);
  //       } else {
  //         reject();
  //       }
  //     }
  //   )
  // });
  // matches.map(relativePath => fse.remove())
  // console.log('matches ==>', matches)
})();
