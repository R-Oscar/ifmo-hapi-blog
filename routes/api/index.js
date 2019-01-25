const PostController = require('../../controllers/post');
const PostModel = require('../../models/post');

const postController = new PostController(PostModel);

module.exports = {
  listAll(request, h) {
    return postController.list();
  },
  add(request, h) {
    const { title, categories, content } = request.payload;
    return postController.add(title, categories, content);
  },
  list(request, h) {
    return postController.get(request.params.id);
  },
  remove(request, h) {
    const { id } = request.params;
    return postController.delete(id);
  }
};
