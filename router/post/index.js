const express = require("express");
const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const postDirectory = `${process.cwd()}/_post`;

const router = express.Router();

router.get("/", (req, res) => {
  res.send("post입니다");
});

router.get("/all", (req, res) => {
  const postData = getChildPost(postDirectory);

  function getChildPost(path) {
    const result = fs.readdirSync(path);

    return result.reduce((sum, current) => {
      const isPost = current.includes(".md");
      if (isPost) {
        const noExt = current.replace(".md", "");

        const result = fs.readFileSync(`${path}/${current}`, {
          encoding: "utf-8",
        });

        const convertedData = matter(result);

        sum.push({
          type: "post",
          title: noExt,
          path: `${path.replace(postDirectory, "")}/${noExt}`,
          data: {
            ...convertedData.data,
            content: convertedData.content,
          },
        });
      } else {
        sum.push({
          type: "directory",
          title: current,
          children: getChildPost(`${path}/${current}`),
        });
      }
      return sum;
    }, []);
  }
  res.json(postData);
});
module.exports = router;
