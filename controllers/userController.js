const fs = require('fs')

const users = JSON.parse(fs.readFileSync(`${__dirname}/../src/data/users.json`))

exports.getAllUsers = (req, res) => {
    console.log(req.query)
    const sortByAsc = (req.query.sort.indexOf('asc') > -1)
    const searchStr = req.query.search
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 3
    const skip = (page - 1) * limit

    let userData
    if (searchStr) userData = users.filter(user => user.name.toLowerCase().includes(searchStr))
    else userData = users

    if (userData) {
        if (sortByAsc) {
            userData = userData.sort((user1, user2) => user1.age - user2.age)
        } else {
            userData = userData.sort((user1, user2) => user2.age - user1.age)
        }
        userData = userData.slice(skip, limit)
    }

    res.status(200).json({
        status: 'success',
        results: userData.length,
        data: userData
    })
}