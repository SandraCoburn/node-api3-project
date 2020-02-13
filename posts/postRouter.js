const express = require("express");

const Posts = require("./postDb.js");

const router = express.Router();

//Read, get all posts
router.get("/", (req, res) => {
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving posts" });
    });
  // do your magic!
});

//Get posts by Id
router.get("/:id", validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving posts" });
    });
  // do your magic!
});

//Destroy, delete post by id
router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id).then(post => {
    if (post.length) {
      Posts.remove(req.params.id)
        .then(count => {
          if (count > 0) {
            res.status(200).json(post);
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Error deleting the post." });
        });
    }
  });
  // do your magic!
});

//Update post by id
router.put("/:id", (req, res) => {
  const updatedPost = req.body;
  Posts.update(req.params.id, updatedPost)
    .then(post => {
      if (post) {
        res.status(200).json(updatedPost);
      } else {
        res
          .status(404)
          .json({ message: "The post with that ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error on updating post" });
    });
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  const postId = req.params.id;
  if (!postId) {
    res.status(400).json({ message: "Invalid post Id" });
  } else {
    next();
  }

  // do your magic!
}

module.exports = router;
