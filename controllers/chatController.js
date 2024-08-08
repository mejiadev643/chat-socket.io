const { Message, User } = require('../models');
const { Op } = require('sequelize'); // Importar operadores de Sequelize
const jwt = require('jsonwebtoken');

exports.getChats = async (req, res) => {
    //obtener el token y extraer el id del usuario
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    try {
        const messages = await Message.findAll(
            {
                where: {
                    [Op.or]: [
                        { user_send_id: userId },
                        { user_receive_id: userId }
                    ],
                },
                include: [{ model: User, as: 'sended' }, { model: User, as: 'received' }]
            },
        );
        const groupedMessages = messages.reduce((acc, message) => {
            const isSender = message.user_send_id === userId;
            const otherUserId = isSender ? message.user_receive_id : message.user_send_id;
            const otherUserName = isSender ? message.received.username : message.sended.username;
            const OtherEmail = isSender ? message.received.email : message.sended.email;

            if (!acc[otherUserId]) {
                acc[otherUserId] = {
                    user: { id: otherUserId, name: otherUserName, email: OtherEmail },
                    messages: []
                };
            }
            acc[otherUserId].messages.push(message);
            return acc;
        }, {});
        res.json(Object.values(groupedMessages));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages', message: error.message });
    }
};
