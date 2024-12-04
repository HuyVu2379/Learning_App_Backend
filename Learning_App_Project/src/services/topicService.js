import { Op } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';

let getCourseByTopic = async (topic) => {
    try {
        await handleTopic(topic);
        let data = await db.Course.findAll({
            where: {
                nameCourse: {
                    [Op.like]: `%${topic}%`,
                },
            },
        });
        if (data.length > 0) {
            let topicInstance = await findTopic(topic);
            if (topicInstance) {
                await db.Topic.update(
                    { courseId: data[0]?.courseId || null },
                    { where: { courseId: topicInstance.courseId } }
                );
            }
        }

        return data;
    } catch (error) {
        console.error("Error fetching courses by topic: ", error.message);
        throw new Error('Failed to fetch courses by topic');
    }
};

let handleTopic = async (topicName) => {
    try {
        if (topicName.length === 0) {
            return;
        }
        const [topic, created] = await db.Topic.findOrCreate({
            where: { topicName },
            raw: false,
            defaults: {
                totalSearch: 1,
                courseId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        if (!created) {
            await topic.increment('totalSearch');
        }

        return {
            message: created ? "Topic created" : "Topic updated",
            topic: topic,
        };
    } catch (error) {
        console.error("Error in handleTopic: ", error.message);
        throw new Error('Failed to handle topic');
    }
};

let findTopic = async (topicName) => {
    try {
        let topic = await db.Topic.findOne({
            where: {
                topicName: {
                    [Op.like]: `%${topicName}%`,
                },
            },
        });

        return topic;
    } catch (error) {
        console.error("Error in findTopic: ", error.message);
        throw new Error('Failed to find topic');
    }
};

let getTopics = async (limit = 10) => {
    try {
        let topics = await db.Topic.findAll({
            limit: parseInt(limit, 10),
        });
        return topics;
    } catch (error) {
        console.error("Error in getTopics: ", error.message);
        throw new Error('Failed to fetch topics');
    }
};


module.exports = {
    getCourseByTopic: getCourseByTopic,
    getTopics: getTopics
};
