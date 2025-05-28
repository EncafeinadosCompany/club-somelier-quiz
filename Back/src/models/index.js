
const { Role } = require('./role.model');
const { User } = require('./user.model');

// Relaciones
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

module.exports = {
    Role,
    User,
};

// // Ejemplo de relaciones adicionales

// // 1:N: Rol -> Usuarios
// Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
// User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

// // 1:1: Usuario -> Perfil
// User.hasOne(Profile, { foreignKey: 'user_id', as: 'profile' });
// Profile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// // N:M: Estudiantes <-> Cursos
// Student.belongsToMany(Course, { through: 'student_course', foreignKey: 'student_id', otherKey: 'course_id', as: 'courses' });
// Course.belongsToMany(Student, { through: 'student_course', foreignKey: 'course_id', otherKey: 'student_id', as: 'students' });
