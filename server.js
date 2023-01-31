const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const dbConnect = require("./src/config/db");
const Project = require("./src/models/project");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dbConnect();

app.post("/", async (req, res) => {
  try {
    const { name, desc, url, githubLink } = req.body;
    if (!name & !desc & !githubLink) {
      throw Error("name, description and github link cannot be left blank");
    } else {
      const details = new Project({
        name,
        desc,
        url,
        githubLink,
      }).save();
      res.status(201).json({
        status: "success",
        msg: "project details added",
        data: req.body,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      msg: error.message,
    });
  }
});

app.patch("/:pID", async (req, res) => {
  try {
    const pID = req.params.pID;
    if (!ObjectId.isValid(pID)) {
      res.status(400);
      throw Error("invalid project id");
    } else {
      const { name, desc, url, githubLink } = req.body;
      const project = Project.findById(pID);
      if (!project) {
        res.status(404);
        throw Error("project not found");
      } else {
        const update = {
          name: name || project.name,
          desc: desc || project.desc,
          url: url || project.url,
          githubLink: githubLink || project.githubLink,
        };
        const projectUpdate = await Project.findByIdAndUpdate(
          pID,
          { $set: update },
          { new: true }
        ).select(["-__v", "-_id"]);
        if (!projectUpdate) {
          res.status(400);
          throw Error("could not update the project");
        } else {
          res.status(200).json({
            status: "success",
            msg: "project updated successfully",
            data: projectUpdate,
          });
        }
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const projects = await Project.find().select(["-__v"]);
    if (!projects) {
      res.status(200).json({
        status: "success",
        msg: "no projects found",
        data: projects,
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: "projects found",
        data: projects,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
});

app.get("/:pID", async (req, res) => {
  try {
    const pID = req.params.pID;
    if (!ObjectId.isValid(pID)) {
      res.status(400);
      throw Error("invalid project id");
    } else {
      const project = await Project.findById(pID).select(["-__v"]);
      if (!project) {
        res.status(404);
        throw Error(`project with ${pID} not found`);
      } else {
        res.status(200).json({
          status: "success",
          msg: `project with ${pID} found`,
          data: project,
        });
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
});

app.delete("/:pID", async (req, res) => {
  try {
    const pID = req.params.pID;
    if (!ObjectId.isValid(pID)) {
      res.status(400);
      throw Error("invalid project id");
    } else {
      const project = await Project.findById(pID).select([
        "-__v",
        "createdAt",
        "updatedAt",
      ]);
      if (!project) {
        res.status(404);
        throw Error("project not found");
      } else {
        await Project.findByIdAndDelete(pID);
        res.status(200).json({
          status: "success",
          msg: `project with ${pID} deleted successffully`,
          data: project,
        });
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
});
app.listen(5000, () => {
  console.log(`Running on port 5000`);
});

//create projects
//update specific projects
//
