const fs = require('fs');

const postsPath = './users.json';

class User {
    constructor(id, username, password, posts) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.posts = posts;
    }
}