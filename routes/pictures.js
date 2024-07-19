var express = require('express');
var router = express.Router();
const cloudinary = require('../config/cloudinary');

/* To get all pictures */
router.get('/all', async (req, res) => {
  try {
    let allResources = [];
    let nextCursor;

    do {
      const result = await cloudinary.search
        .expression('folder:villa-calm/*')
        .max_results(200) 
        .next_cursor(nextCursor)
        .execute();

      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor);
    res.status(200).json({
      result: true,
      datas: allResources,
    });
  } catch (error) {
    return res.json({
      result: false,
      error: error,
    });
  }
});

/* To get all mockups */
router.get('/mockup', async (req, res) => {
  console.log('requete');
  try {
    const result = await cloudinary.search
      .expression('folder:villa-calm/maquettes')
      .execute();
    console.log('try', result);
    res.status(200).json({
      result: true,
      datas: result.resources,
    });
  } catch (error) {
    console.log('catch', error);
    return res.json({
      result: false,
      error: error,
    });
  }
});

/* To get pictures by subfolders */
router.get('/:subfolder', async (req, res) => {
  const month = req.params.subfolder;
  try {
    const result = await cloudinary.search
      .expression(`folder:villa-calm/${month}`)
      .execute();
    res.status(200).json({
      result: true,
      datas: result.resources,
    });
  } catch (error) {
    return res.json({
      result: false,
      error: error,
    });
  }
});

module.exports = router;
