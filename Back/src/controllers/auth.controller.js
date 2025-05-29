const AuthService = require('../services/auth.service');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

}

module.exports = AuthController;