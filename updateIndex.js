const fs = require('fs');
const path = require('path');

const REPORTS_DIR = './reports';
const OUTPUT_HTML = './index.html';
const TEMPLATE_FILE = './index.html.template';

(async () => {
    // Read all directories inside the `reports` folder
    const reports = fs.readdirSync(REPORTS_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    // Generate links for each report
    const links = reports.map(report => {
        return `<li><a href="./reports/${report}/index.html" target="_blank">${report}</a></li>`;
    }).join('\n');

    // Use a template for the HTML (if available), or create the HTML from scratch
    const template = fs.existsSync(TEMPLATE_FILE)
        ? fs.readFileSync(TEMPLATE_FILE, 'utf-8')
        : `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Allure Reports</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 10px 0; }
        a { text-decoration: none; color: #1a73e8; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>Allure Reports</h1>
    <ul>
        {{LINKS}}
    </ul>
</body>
</html>`;

    // Replace placeholder or append links to the HTML
    const updatedHTML = template.replace('{{LINKS}}', links);

    // Write the updated HTML to the index.html file
    fs.writeFileSync(OUTPUT_HTML, updatedHTML);

    console.log(`Updated ${OUTPUT_HTML} with ${reports.length} reports.`);
})();
