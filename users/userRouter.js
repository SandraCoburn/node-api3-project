const express = require("express");
const Users = require("./userDb.js");
const router = express.Router();
const Posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error adding new user" });
    });
  // do your magic!
});

router.post("/:id/posts", validatePost, (req, res) => {
  const { id } = req.params;
  const newPost = { ...req.body, id: id };
  Posts.insert(newPost)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error sending the message" });
    });
  // do your magic!
});

router.get("/", (req, res) => {
  Users.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error retriving the user" });
    });
  // do your magic!
});

router.get("/:id", validateUserId, (req, res) => {
  Users.getById(req.params.id).then(user => {
    res.status(200).json(user);
  });
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  Users.getUserPosts(res.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting the messages" });
    });
  // do your magic!
});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "User has been removed" });
      } else {
        res.status(404).json({ message: "user couldn't be found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting user" });
    });
  // do your magic!
});

router.put("/:id", (req, res) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(req.body);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "User couldn't be found" });
    });
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.parms.id;
  if (userId) {
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
  // do your magic!
}

function validateUser(req, res, next) {
  const user = req.body;
  if (!user) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required text field" });
  }
  // do your magic!
}

function validatePost(req, res, next) {
  const post = req.body;
  if (!post) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
  }
  // do your magic!
}

module.exports = router;
