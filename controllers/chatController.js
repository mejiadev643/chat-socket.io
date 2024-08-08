const { Message } = require('../models');
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
                }
            }
        );
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages', message: error.message });
    }
};
