const UserService = require('../services/user.service');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req, res) => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  getUserById = async (req, res) => {
    const user = await this.userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  }

  createUser = async (req, res) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  }

  updateUser = async (req, res) => {
    await this.userService.updateUser(req.params.id, req.body);
    res.sendStatus(204);
  }

  deleteUser = async (req, res) => {
    await this.userService.deleteUser(req.params.id);
    res.sendStatus(204);
  }
}

module.exports = UserController;
