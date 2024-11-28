import { Op } from 'sequelize';
import Sequelize from 'sequelize';
import db from '../models/index';

let getCourseByTopic = (topic) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Gọi hàm handleTopic để xử lý topic
            await handleTopic(topic);

            // Tìm các khóa học liên quan đến topic trong cơ sở dữ liệu
            let data = await db.Course.findAll({
                where: {
                    nameCourse: {
                        [Op.like]: `%${topic}%`, // Tìm kiếm khóa học theo tên có chứa topic
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

            // Trả về kết quả
            resolve(data);
        } catch (error) {
            console.error("Error fetching courses by topic: ", error);
            reject(error);
        }
    });
};

let handleTopic = (topicName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [topic, created] = await db.Topic.findOrCreate({
                where: { topicName: topicName },
                defaults: {
                    totalSearch: 1,
                    courseId: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            if (!created) {
                await db.Topic.update(
                    { totalSearch: Sequelize.literal('totalSearch + 1') },
                    { where: { topicId: topic.topicId } }
                );
            }

            resolve({
                message: created ? "Topic created" : "Topic updated",
                topic: topic,
            });
        } catch (error) {
            console.error("Error in handleTopic: ", error);
            reject(error);
        }
    });
};

let findTopic = (topicName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let topic = await db.Topic.findOne({
                where: {
                    topicName: {
                        [Op.like]: `%${topicName}%`,
                    },
                },
            });

            resolve(topic); // Trả về instance của model
        } catch (error) {
            console.error("Error in findTopic: ", error);
            reject(error);
        }
    });
};

module.exports = {
    getCourseByTopic: getCourseByTopic,
};
