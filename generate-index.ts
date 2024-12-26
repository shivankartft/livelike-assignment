import * as fs from 'fs';
import * as path from 'path';

const reportsDir = path.join(__dirname, 'gh-pages', 'reports');
const templateFile = path.join(__dirname, 'template.html');
const outputFile = path.join(__dirname, 'gh-pages', 'index.html');

// Ensure the reports directory exists
if (!fs.existsSync(reportsDir)) {
  console.error(`Reports directory does not exist: ${reportsDir}`);
  process.exit(1);
}

// Ensure the template file exists
if (!fs.existsSync(templateFile)) {
  console.error(`Template file does not exist: ${templateFile}`);
  process.exit(1);
}

// Read the template file
const templateContent = fs.readFileSync(templateFile, 'utf-8');

// Read the directories in the reports folder
const reports = fs.readdirSync(reportsDir).filter((file) => {
  return fs.statSync(path.join(reportsDir, file)).isDirectory();
});

// Generate the list items dynamically
const listItems = reports.map(
  (dir) => `<li><a href="./reports/${dir}">Build ${dir}</a></li>`
).join('\n');

// Replace the placeholder with the generated list items
const finalHtmlContent = templateContent.replace('<!-- INSERT REPORT LINKS HERE -->', listItems);

// Write the updated content to the output file
fs.writeFileSync(outputFile, finalHtmlContent);
console.log(`Index file generated at ${outputFile}`);
