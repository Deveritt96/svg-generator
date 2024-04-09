const fs = require('fs');
const inquirer = require('inquirer');

// Prompting the user for customization options
inquirer.prompt([
    {
        type: 'input',
        name: 'width',
        message: 'Enter the width of the SVG (in pixels):',
        default: 100
    },
    {
        type: 'input',
        name: 'height',
        message: 'Enter the height of the SVG (in pixels):',
        default: 100
    },
    {
        type: 'input',
        name: 'fillColor',
        message: 'Enter the fill color of the shape (in hex format, e.g., #ff0000 for red):',
        default: '#000000'
    },
    {
        type: 'input',
        name: 'shape',
        message: 'Enter the type of shape (e.g., circle, rectangle):',
        default: 'circle'
    },
    {
        type: 'input',
        name: 'text',
        message: 'Enter the text you want to display on the shape:',
        default: ''
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the color of the text:',
        default: 'white'
    },
    {
        type: 'input',
        name: 'textSize',
        message: 'Enter the font size of the text (in pixels):',
        default: 12
    },
    {
        type: 'confirm',
        name: 'save',
        message: 'Do you want to save the SVG file?',
        default: true
    }
]).then(answers => {
    // Generate SVG string based on user input
    let svgContent = `<svg width="${answers.width}" height="${answers.height}" xmlns="http://www.w3.org/2000/svg">`;
    if (answers.shape === 'circle') {
        svgContent += `<circle cx="${answers.width / 2}" cy="${answers.height / 2}" r="${Math.min(answers.width, answers.height) / 2}" fill="${answers.fillColor}" />
        <text x="${answers.width / 2}" y="${answers.height / 2}" text-anchor="middle" alignment-baseline="middle" font-size="${answers.textSize}px" fill="${answers.textColor}">${answers.text}</text>`;
    } else if (answers.shape === 'rectangle') {
        svgContent += `<rect x="0" y="0" width="${answers.width}" height="${answers.height}" fill="${answers.textColor}" />
        <text x="${answers.width / 2}" y="${answers.height / 2}" text-anchor="middle" alignment-baseline="middle" font-size="${answers.textSize}px" fill="${answers.textColor}">${answers.text}</text>`;
    }

    svgContent += `</svg>`;

    console.log('Generated SVG content:');
    console.log(svgContent);

    // Save SVG file if user chooses to do so
    if (answers.save) {
        const fileName = `${answers.text}.svg`;
        fs.writeFile(fileName, svgContent, (err) => {
            if (err) {
                console.error('Error saving SVG file:', err);
            } else {
                console.log(`SVG file saved as ${fileName}`);
            }
        });
    }
});
