import topicService from '../services/topicService';
let handleFindCourseByTopic = async (req, res) => {
    try {
        let topic = req.params.topicName || req.query.topicName;
        let courses = await topicService.getCourseByTopic(topic);
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}
module.exports = {
    handleFindCourseByTopic: handleFindCourseByTopic
};
