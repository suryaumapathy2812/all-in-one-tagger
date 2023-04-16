const fs = require('fs');
const path = require("path");
const jsTopicTagger = require('./js/topic_tagger');
const jsLint = require('./lint/indexLint');
const htmlLint = require('./lint/html_lint');

const htmlTopicTagger = require('./html/html_tagger');

(async () => {

    const PROJECTS = fs.readdirSync(__dirname + "/PROJECTS", { withFileTypes: true })
    console.log(JSON.stringify(PROJECTS, null, 2))

    for (const project of PROJECTS) {

        const { name } = project;

        const topicCount = jsTopicTagger(`./PROJECTS/${name}`)
        console.log(JSON.stringify(topicCount, null, 2))
        project['topics'] = topicCount;

        const { score, issues } = await jsLint(name)
        project['javascript'] = { score, issues };


        const htmlResults = await htmlLint(name)
        project['html'] = { score: htmlResults.score, issues: htmlResults.score };


        // const htmlScore = htmlTopicTagger(name)


    }

    console.log(JSON.stringify(PROJECTS, null, 2))
})()