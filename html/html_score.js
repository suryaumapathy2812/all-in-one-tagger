function maxLevelScore(topics) {
    const levelScores = {};

    Object.keys(topics).forEach(level => {

        const levelTopics = topics[level];
        let totalTags = 0;
        let totalAttributes = 0;

        levelTopics.forEach(topic => {
            totalTags += topic.tags.length;
            totalAttributes += topic.attributes.length
        })

        const totalPossiblePoints = totalTags + totalAttributes;
        levelScores[level] = totalPossiblePoints;
    })

    return levelScores;
}

function levelScores(topics, tagCounts, attributeCounts) {
    const levelScores = {};

    Object.keys(topics).forEach(level => {
        const levelTopics = topics[level];
        let totalTags = 0;
        let totalAttributes = 0;
        let implementedTags = 0;
        let implementedAttributes = 0;

        levelTopics.forEach(topic => {
            totalTags += topic.tags.length;
            totalAttributes += topic.attributes.length;

            topic.tags.forEach(tag => {
                if (tagCounts[tag]) {
                    implementedTags++;
                }
            });

            topic.attributes.forEach(attr => {
                if (attributeCounts[attr]) {
                    implementedAttributes++;
                }
            });
        });

        const totalPossiblePoints = totalTags + totalAttributes;
        const pointsEarned = implementedTags + implementedAttributes;
        const levelScore = (pointsEarned / totalPossiblePoints) * 100;

        levelScores[level] = levelScore;
    });

    return levelScores;

}

module.exports = { calculateLevelScores: levelScores, maxLevelScore }

