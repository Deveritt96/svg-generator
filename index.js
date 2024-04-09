const fs = require('fs');
const inquirer = require('inquirer');

// Define the Circle class
class Circle {
    constructor(width, height, fillColor, text, textColor, textSize) {
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.text = text;
        this.textColor = textColor;
        this.textSize = textSize;
    }

    generateSVG() {
        const radius = Math.min(this.width, this.height) / 2;
        return `<circle cx="${this.width / 2}" cy="${this.height / 2}" r="${radius}" fill="${this.fillColor}" />
        <text x="${this.width / 2}" y="${this.height / 2}" text-anchor="middle" alignment-baseline="middle" font-size="${this.textSize}px" fill="${this.textColor}">${this.text}</text>`;
    }
}

// Define the Rectangle class
class Rectangle {
    constructor(width, height, fillColor, text, textColor, textSize) {
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.text = text;
        this.textColor = textColor;
        this.textSize = textSize;
    }

    generateSVG() {
        return `<rect x="0" y="0" width="${this.width}" height="${this.height}" fill="${this.fillColor}" />
        <text x="${this.width / 2}" y="${this.height / 2}" text-anchor="middle" alignment-baseline="middle" font-size="${this.textSize}px" fill="${this.textColor}">${this.text}</text>`;
    }
}

// Define the Triangle class
class Triangle {
    constructor(width, height, fillColor, text, textColor, textSize) {
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.text = text;
        this.textColor = textColor;
        this.textSize = textSize;
    }

    generateSVG() {
        return `<polygon points="${this.width/2},0 ${this.width}, ${this.height} 0, ${this.height}" fill="${this.fillColor}" />
        <text x="${this.width / 2}" y="${this.height / 2}" text-anchor="middle" alignment-baseline="middle" font-size="${this.textSize}px" fill="${this.textColor}">${this.text}</text>`;
    }
}

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
        default: 'red'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose the type of shape:',
        choices: ['Circle', 'Rectangle', 'Triangle'],
        default: 'Circle'
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
    let shape;
    if (answers.shape === 'Circle') {
        shape = new Circle(answers.width, answers.height, answers.fillColor, answers.text, answers.textColor, answers.textSize);
    } else if (answers.shape === 'Rectangle') {
        shape = new Rectangle(answers.width, answers.height, answers.fillColor, answers.text, answers.textColor, answers.textSize);
    } else if (answers.shape === 'Triangle') {
        shape = new Triangle(answers.width, answers.height, answers.fillColor, answers.text, answers.textColor, answers.textSize);
    }

    const svgContent = `<svg width="${answers.width}" height="${answers.height}" xmlns="http://www.w3.org/2000/svg">${shape.generateSVG()}</svg>`;

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