import topicService from '../services/topicService';
let handleFindCourseByTopic = async (req, res) => {
    try {
        let topic = req.query.topicName;
        let courses = await topicService.getCourseByTopic(topic);
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}
let handleFindTopics = async (req, res) => {
    try {
        let { limit } = req.query;
        limit = parseInt(limit)
        let topics = await topicService.getTopics(limit);
        return res.status(200).json(topics);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}
module.exports = {
    handleFindCourseByTopic: handleFindCourseByTopic,
    handleFindTopics: handleFindTopics
};
