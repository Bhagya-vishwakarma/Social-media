const db =require('../config/database');
const addUser = async (username, pass) => {
    try {
        return await db.users.create({
            data: {
                username: username,
                password: pass
            }
        }
        )
    }
    catch (e) {
        console.log("error in creating user" + e);
    }
}
const findUserByName = async (username) => {
    try {
        return await db.users.findUnique({
            where: {
                username
            }
        }
        );
    }
    catch (e) {
        console.log("error in finding user" + e);
    }
}
module.exports = {findUserByName,addUser}