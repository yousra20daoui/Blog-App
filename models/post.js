const fs = require('fs');

const postsPath = './posts.json';

class Post {
    constructor(id, title, author, date, content, tags) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.date = date;
        this.content = content;
        this.tags = tags;
    }
}
const AllPosts = () => {
    try {
        const Data = fs.readFileSync(postsPath);
        return JSON.parse(Data);
        // return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
        console.error("Error reading or parsing posts data:", error);
        return [];
    }
};

const createPost = (newPost) => {
    const postsData = AllPosts();
    let lastId = 0;
    if (postsData.posts.length > 0) {
        lastId = parseInt(postsData.posts[postsData.posts.length - 1].id);
    }
    const newId = lastId + 1;

     const newPostObject = {
        id: newId.toString(),
        title: newPost.title,
        author: newPost.author,
        date: newPost.date,
        content: newPost.content,
        tags: newPost.tags
    };
     postsData.posts.push(newPostObject);
     fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));
};

  const delPost = (postId) => {
    let postsData = AllPosts().posts;
    // console.log(postsData);
    postsData = postsData.filter(post => post.id != postId);
    fs.writeFileSync(postsPath, JSON.stringify({ posts: postsData }, null, 2));
};


module.exports = {
    Post,
    AllPosts,
    createPost,
    delPost
};