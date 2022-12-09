const validarUsuario = (req) => {
    const validaciones = [];

    if (!req.body.nombre) {
        validaciones.push('El nombre es requerido');
    };
    if (!req.body.email) {
        validaciones.push('El e-mail es requerido');
    };
    if (!req.body.rol) {
        validaciones.push('El rol es requerido');
    };
    if (!req.body.contrasena) {
        validaciones.push('La contraseña es requerida');
    };
    if (!req.body.estado) {
        validaciones.push('El estado es requerido');
    }


    return validaciones;
}

module.exports = {
    validarUsuario,
}