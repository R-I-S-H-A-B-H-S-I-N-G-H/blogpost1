const express = require("express");
const router = express.Router();
const {marked} = require("marked");
const createDomPurifyer = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify=createDomPurifyer(new JSDOM().window)


const database = require("../models/firebase");

router.get("/", async (req, res) => {
  res.json("blogs page");
});
router.get("/markdown", (req,res) => { 
  const markedText= marked.parse(req.body);
  res.json(markedText);
});

router
  .get("/new", (req, res) => {
    res.json("blogs/createNew");
  })
  .post("/new", async (req, res) => {
    // here blogs are added to the firebase🔥
    console.log(req.body);
    // const markdown =
    // dompurify.sanitize(marked(req.body.Markdown));
    const markdown = dompurify.sanitize(marked.parse(req.body.Markdown));
    
    console.log("markdown: ",req.body.Markdown);
    console.log(markdown);
    database
      .add({
        Title: req.body.Title,
        Description: req.body.Description,
        Markdown:markdown
      })
      .then((res) => {
        console.log("id ", res.id);
      });
    res.redirect("/");
  });

router.get("/list/:title", async (req, res) => {
  var result = (await (await getData(req.params.title)).docs.length) == 0;
  res.status(200).json(result);
});

async function getData(title) {
  return await database.where("Title", "==", title).get();
}
router.get("/:title", async (req, res) => {
  // var rawData = (await database.where('Title', '==', req.params.title).get())
  // 	.docs;
  var rawData = await (await getData(req.params.title)).docs;

  // console.log(rawData[0]._ref._path.segments[1]);
  // res.json(rawData);
  var data = rawData[0];
  var title_Data = data["_fieldsProto"]["Title"];
  var des_Data = data["_fieldsProto"]["Description"];
  var markdown_Data = data["_fieldsProto"]["Markdown"];
  res.json({
    Title: title_Data[title_Data["valueType"]],
    Description: des_Data[des_Data["valueType"]],
    Markdown:markdown_Data[markdown_Data["valueType"]],
  });
});
module.exports = router;
