const registerRepo = require('../repository');

async function createUser(req, res) {
  let user = {};
  const registerSuccessMessage = 'You have successfully registered, you can now log in.';
  try {
    user = await registerRepo.createUser(req.body);
  } catch (error) {
    user = error;
  }
  if (user.email) {
    return res.send({ success: true, messages: { success: registerSuccessMessage } });
  }
  const { code } = user;
  const databaseError =
    code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';

  return res.status(500).send({ success: false, messages: { databaseError } });
}

module.exports = createUser;
