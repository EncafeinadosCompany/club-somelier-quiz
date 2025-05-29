const AdminService = require("../services/admin.service");

class AdminController {
  constructor() {
    this.adminService = new AdminService();
  }

  getAdminById = async (req, res, next) => {
   const admin= await this.adminService.getAdminById(req.params.id)
   if(!admin) return res.status(404).json({error: 'Admin not found'});
   res.json(admin)
  };

  createAdmin = async (req, res, next) => {
    try {
      const admin = await this.adminService.createAdmin(req.body);
      res.status(201).json(admin);

    } catch (error) {
        if (error.status === 409) {
            return res.status(409).json({ message: error.message });
        }
      res.status(500).json({ message: "Error creating admin", error });
    }
  };
}

module.exports = AdminController;
