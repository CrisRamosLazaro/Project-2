const getUserRole = user => {

    const userRole = {
        isAdmin: user?.role === 'ADMIN',
        isCinephile: user?.role === 'CINEPHILE'
    }

    return userRole
}

module.exports = { getUserRole }