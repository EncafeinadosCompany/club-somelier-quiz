const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const AdminRepository = require('../repositories/admin.repository');

class AdminService {
  constructor() {
     this.adminRepository = new AdminRepository();
  }

  async createAdmin(data) {
    // Verificar si existe el admin
     const existingAdmin = await this.adminRepository.findByEmail(data.email);

    if (existingAdmin) {
      const error = new Error('Admin with this email already exists');
      error.status = StatusCodes.CONFLICT; // 409
      throw error;
    }

    // Encriptar password y crear admin
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const adminData = {
      ...data,
      password: hashedPassword
    };

    const newAdmin = await this.adminRepository.create(adminData);
    
    // Remover password del resultado
    const { password, ...adminWithoutPassword } = newAdmin.toJSON();
    return adminWithoutPassword;
  }

  async getAdminById(id) {
    const admin = await this.adminRepository.getById(id);
    if (!admin) {
      const error = new Error('Admin not found');
      error.status = StatusCodes.NOT_FOUND;
      throw error;
    }
    const { password, ...adminWithoutPassword } = admin.toJSON();
    return adminWithoutPassword;
  }
}

module.exports = AdminService;