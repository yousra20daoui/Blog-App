// const Post = require('../models/post');
const fs = require('fs');
const { Post, AllPosts, createPost, delPost } = require('../models/post');
const postsPath = './posts.json';

const postsController = {
    getAllPosts: (req, res) => {
        res.write('All posts:\n\n');
        res.write(JSON.stringify(AllPosts(), null, 2));
        res.end();
    },

    // getFilteredPosts: (req, res) => {
    //     const n = req.query.n;
    //     const auth = req.query.auth;
    //     const d = req.query.d;

    //     let filteredPosts = AllPosts();

    //     if (n) {
    //         filteredPosts = filteredPosts.filter(post =>
    //             post.name.toLowerCase().includes(n.toLowerCase())
    //         );
    //     }

    //     if (auth) {
    //         filteredPosts = filteredPosts.filter(post =>
    //             post.author.toLowerCase().includes(auth.toLowerCase())
    //         );
    //     }

    //     if (d) {
    //         filteredPosts = filteredPosts.filter(post =>
    //             post.date === d
    //         );
    //     }


    //     const filteredPostsString = JSON.stringify(filteredPosts, null, 2);

    //     res.write(filteredPostsString);
    //     res.end();
    // },

    getPostById: (req, res) => {
        const Id = req.params.id;
        const allPosts = AllPosts().posts;
        // console.log("All posts:", allPosts);
        const post = allPosts.find(post => post.id == parseInt(Id));
        if (!post) {
            res.status(404).send('Post not found');
            return;
        }
        res.write(`the post with the ID ${Id}:\n\n`);
        res.write(JSON.stringify(post, null, 2));
        res.end();
    },

    addPost: (req, res) => {
        const post = req.body;
        const postsData = AllPosts().posts;

        if (!Array.isArray(postsData)) {
            // Gérer le cas où AllPosts() ne renvoie pas un tableau
            res.status(500).send("Internal Server Error");
            return;
        }

        let exists = postsData.some((x) => x.id === post.id);

        if (exists) {
            res.status(400).send("Post already exists");
        } else {
            postsData.push(post);
            createPost(post);
            // fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));
            res.send("Post added successfully");
        }
        res.end();
    },

    updatePost: (req, res) => {
        const Id = req.params.id;
        const allPosts = AllPosts();
        const postIndex = allPosts.posts.findIndex(post => post.id == Id);

        if (postIndex === -1) {
            res.status(404).send('Post not found');
            return;
        }

        allPosts.posts[postIndex] = { ...allPosts.posts[postIndex], ...req.body };
        fs.writeFileSync(postsPath, JSON.stringify(allPosts, null, 2));
        res.send("Post updated successfully");
        res.end();
    },

    deletePost: (req, res) => {
        const postId = parseInt(req.params.id);
        // const index = AllPosts().posts.findIndex(post => post.id == postId);

        // if (index === -1) {
        //     res.status(404).send('Post not found');
        //     return;
        // }

        // delPost(postId);
        // // AllPosts().splice(index, 1);
        // res.send('Post deleted successfully');
        
    if (!Number.isInteger(postId)) {
        res.status(400).send('Invalid post ID');
        return;
    }

    delPost(postId);

    res.send('Post deleted successfully');

    }
};

module.exports = postsController;
