const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      filelist.push(dir + '/' + file);
    }
  });
  return filelist;
};

const allFiles = walkSync('C:/Users/LENOVO/OneDrive/Desktop/Desert Safari webapp/client/src');
allFiles.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('process.env.NEXT_PUBLIC_API_URL')) {
      // Replace the entire template expression with the hardcoded URL
      content = content.replace(/\${process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000\/api'}/g, 'https://server-one-alpha-61.vercel.app/api');
      fs.writeFileSync(file, content);
      console.log('Hardcoded', file);
    }
  }
});
