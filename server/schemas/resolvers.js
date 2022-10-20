const { Book, User } = require('../models');

const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      tech: async () => {
        return Tech.find({});
      },
      matchups: async (parent, { _id }) => {
        const params = _id ? { _id } : {};
        return Matchup.find(params);
      },
    },
    Mutation: {
      createUser: async (parent, args) => {
        const user = await User.create(args);
        return user;
      },
      createVote: async (parent, { _id, techNum }) => {
        const vote = await Matchup.findOneAndUpdate(
          { _id },
          { $inc: { [`tech${techNum}_votes`]: 1 } },
          { new: true }
        );
        return vote;
      },
    },
  };
  
  module.exports = resolvers;