const validarInventario = (req) => {
    const validaciones = [];

    if (!req.body.serial) {
        validaciones.push('Serial es requerido');
    };
    if (!req.body.modelo) {
        validaciones.push('Modelo es requerido');
    };
    if (!req.body.descripcion) {
        validaciones.push('La descripción es requerida');
    };
    if (!req.body.foto) {
        validaciones.push('La foto es requerida');
    };
    if (!req.body.fechaCompra) {
        validaciones.push('La fecha de compra es requerida');
    };
    if (!req.body.precio) {
        validaciones.push('El precio es requerido');
    };
    if (!req.body.usuario) {
        validaciones.push('el usuario es requerido');
    };
    if (!req.body.marca) {
        validaciones.push('La marca es requerida');
    };
    if (!req.body.tipoEquipo) {
        validaciones.push('El tipo de equipo es requerido');
    };
    if (!req.body.estadoEquipo) {
        validaciones.push('El estado es requerido');
    }

    return validaciones;
}

module.exports = {
    validarInventario,
}