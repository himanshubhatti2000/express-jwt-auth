const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: {
    type: String,
    select: false
  },
  refreshTokens: [
    {
      type: String,
      select: false,
    }
  ],
  del: {
    default: 'haha',
    type: String,
    createdAt: { type: Date, expires: '15s', default: Date.now }
  }
 
});

module.exports= mongoose.model('User', userSchema);