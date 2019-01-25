const Category = require('../models/category');

class PostController {
  constructor(model) {
    this.model = model;
  }

  async add(title, categories, content) {
    // const [{ _id }] = await Category.findOne()
    //   .byName('Animals')
    //   .exec();

    const hardCodedCategoryIds = ['5c4a233c691a612044210f90'];

    const post = new this.model({ title, categories: hardCodedCategoryIds, content });
    return await post.save();
  }

  async get(id) {
    return await this.model
      .findOne()
      .byId(id)
      .populate({
        path: 'categories',
        select: '-_id -__v'
      })
      .exec();
  }

  async list() {
    return await this.model
      .find({})
      .select('-_id -__v')
      .populate({ path: 'categories', select: '-_id -__v' })
      .exec();
  }

  async delete(id) {
    return await this.model.deleteOne({ id });
  }
}

module.exports = PostController;
