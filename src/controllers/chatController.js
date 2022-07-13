import db from '../database/models/index.js';
const Chat = db['chat'];

/*app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })

})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})
*/

export const sendPost = async (req, res) => {
  try {
    const post = { userName: req.body.userName, message: req.body.message };
    await Chat.create(post);
    io.broadcast.emit('message', post);
    res.status(200);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const allPosts = await Chat.findAndCountAll();
    io.broadcast.emit(allPosts);
    res.status(200);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
