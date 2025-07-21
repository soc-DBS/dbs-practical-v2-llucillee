const { PrismaClient, Prisma } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

module.exports.create = function create(code, name, credit) {
    return prisma.module.create({
        data: {
            modCode: code,
            modName: name,
            creditUnit: parseInt(credit)
        }
    })
    .then(function (module) {
        return module; // Return the created module
    })
    .catch(function (error) {
        // Check for Prisma unique constraint violation error
        if (error.code === 'P2002') {
            throw new Error(`The Module ${code} already exists.`);
        }
        throw error; // Rethrow if it's a different error
    });
};

module.exports.updateByCode = function updateByCode(code, credit) {
    return prisma.module.update({
        where: {
            modCode: code
        },
        data: {
            creditUnit: parseInt(credit)
        }
    }).then(function (module) {
        return module;
    }).catch(function (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new Error(`The Module (${code}) was not found`);
            }
        }
        throw error;
    });
};

module.exports.deleteByCode = function deleteByCode(code) {
    return prisma.module.delete({
        where: {
            modCode: code
        }
    }).then(function (module) {
        return module;
    }).catch(function (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new Error(`The Module (${code}) was not found`);
            }
        }
        throw error;
    });
};


module.exports.retrieveAll = function retrieveAll() {
    return prisma.module.findMany();
};

module.exports.retrieveByCode = function retrieveByCode(code) {
    return prisma.module.findUnique({
        where: {
            modCode: code
        }
    }).then(function (module) {
        if (!module) {
            throw new Error("Module not found");
        }
        return module;
    }).catch(function (error) {
        // Handle known Prisma errors if needed
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new Error("Module not found");
        }
        throw error;
    });
};
