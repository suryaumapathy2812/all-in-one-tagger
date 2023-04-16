const { ESLint } = require('eslint');
const path = require('path');
const fs = require('fs')


// Define your custom ESLint configuration object
const customConfig = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['html'],
    rules: {
        indent: ['error', 2],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
};;

function calculateScore(results) {

    let totalErrors = 0;
    let totalWarnings = 0;

    results.forEach(result => {
        totalErrors += result.errorCount;
        totalWarnings += result.warningCount;
    });

    const maxIssues = totalErrors + totalWarnings;

    if (maxIssues === 0) {
        console.debug('No issues found. ESLint score: 100%');
        return 100
    }

    const currentIssues = totalErrors + (totalWarnings * 0.5);
    const score = ((maxIssues - currentIssues) / maxIssues) * 100;

    if (isNaN(score)) {
        console.debug('Error: Unable to calculate ESLint score');
        return 0;
    } else {
        console.debug(`ESLint score: ${score.toFixed(2)}%`);
        return score;
    }

}


async function run(projectName) {

    const projectPath = './PROJECTS/' + projectName + `/**/*.html`
    console.log(projectPath)

    const eslint = new ESLint({ overrideConfig: customConfig, fix: true });
    const results = await eslint.lintFiles([projectPath]);

    await ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter('stylish');
    const issues = formatter.format(results)
    console.log(issues);

    const jsonFormatter = await eslint.loadFormatter('json');
    const resultJson = jsonFormatter.format(results);

    const score = calculateScore(JSON.parse(resultJson))
    console.log(score)

    return { score, issues: JSON.parse(resultJson) }

}


module.exports = run
