"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var reportsDir = path.join(__dirname, 'gh-pages', 'reports');
var templateFile = path.join(__dirname, 'template.html');
var outputFile = path.join(__dirname, 'gh-pages', 'index.html');
// Ensure the reports directory exists
if (!fs.existsSync(reportsDir)) {
    console.error("Reports directory does not exist: ".concat(reportsDir));
    process.exit(1);
}
// Ensure the template file exists
if (!fs.existsSync(templateFile)) {
    console.error("Template file does not exist: ".concat(templateFile));
    process.exit(1);
}
// Read the template file
var templateContent = fs.readFileSync(templateFile, 'utf-8');
// Read the directories in the reports folder
var reports = fs.readdirSync(reportsDir).filter(function (file) {
    return fs.statSync(path.join(reportsDir, file)).isDirectory();
});
// Generate the list items dynamically
var listItems = reports.map(function (dir) { return "<li><a href=\"./reports/".concat(dir, "\">Build ").concat(dir, "</a></li>"); }).join('\n');
// Replace the placeholder with the generated list items
var finalHtmlContent = templateContent.replace('<!-- INSERT REPORT LINKS HERE -->', listItems);
// Write the updated content to the output file
fs.writeFileSync(outputFile, finalHtmlContent);
console.log("Index file generated at ".concat(outputFile));
