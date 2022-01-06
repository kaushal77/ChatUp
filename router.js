const express = require('express');
const router = express.Router();
var cors = require('cors');

router.use(cors());
router.get('/',(req,res)=>{
    res.status(200).json({data:'server is running'});
})

module.exports = router;