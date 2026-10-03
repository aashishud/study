const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\milky\\OneDrive\\Desktop\\New Text Document.html', 'utf8');
const match = html.match(/const studyData = (\[[\s\S]*?\]);\s*(?:<\/script>|\n\s*let)/);
if (match) {
    const tsContent = `export interface StudyItem { q: string; a: string; }\nexport interface StudySection { section: string; items: StudyItem[]; }\n\nexport const studyData: StudySection[] = ${match[1]};\n`;
    fs.mkdirSync('src/data', { recursive: true });
    fs.writeFileSync('src/data/studyData.ts', tsContent);
    console.log('Data extracted successfully.');
} else {
    // Fallback if the regex fails
    console.log('Could not parse precisely, trying looser regex...');
    const looseMatch = html.match(/const studyData = (\[[\s\S]*?\])\s*;/);
    if(looseMatch) {
       const tsContent = `export interface StudyItem { q: string; a: string; }\nexport interface StudySection { section: string; items: StudyItem[]; }\n\nexport const studyData: StudySection[] = ${looseMatch[1]};\n`;
       fs.mkdirSync('src/data', { recursive: true });
       fs.writeFileSync('src/data/studyData.ts', tsContent);
       console.log('Data extracted successfully (loose).');
    } else {
       console.error('Extraction failed.');
    }
}
