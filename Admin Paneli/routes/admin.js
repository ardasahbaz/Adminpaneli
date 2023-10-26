const express = require("express");

const router = express.Router();

const path = require("path");

const db = require("../data/db");



// Admin Paneli personal trainer ekleme formu

router.get("/admin/personal/add", async function(req, res) {

    try{
        res.render("../views/admin/personaladd");
    }
    catch(err){
        console.log(err);
    }   
  
    
});

// Admin Paneli personal trainer ekleme formunun çalışması değeleri aktarması

router.post("/admin/personal/add", async function(req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const detays = req.body.detays;
    const anasayfa = req.body.anasayfa == "on" ? 1:0;

    try {
        await db.execute("INSERT INTO card(name, image, detays, anasayfa) VALUES (?,?,?,?)" 
        , [name, image, detays, anasayfa]);
        res.redirect("/admin/personals");
       
    }
    catch(err){
        console.log(err);
        
    }


});




// Admin Paneli personal trainer güncelleme formu

router.get("/admin/personals/:blogid", async function(req, res) {
    const blogid = req.params.blogid;

    try {
        const [blogs, ] = await db.execute("select * from card where blogid=?", [blogid]);
        blog = blogs[0];

        if(blog){
            res.render("../views/admin/personaledit", {
                blog: blog
            });
        }
       
    }
    catch(err){
        console.log(err);
    }
    
});


// Admin Paneli personal trainer güncelleme formunun updateinin çalışması

router.post("/admin/personals/:blogid", async function(req, res) {
    const blogid = req.body.blogid;
    const name = req.body.name;
    const image = req.body.image;
    const detays = req.body.detays;
    const anasayfa = req.body.anasayfa == "on" ? 1:0;

    try {
         await db.execute("UPDATE card SET name=?, image=?, detays=?, anasayfa=? WHERE blogid=?", [name, image, detays, anasayfa, blogid]);
        res.redirect("/admin/personals");
       
    }
    catch(err){
        console.log(err);
    }
    
});






// Admin Paneli Listesi Gösterimi

router.get("/admin/personals", async function(req, res) {

    try {
        const [blogs, ] = await db.execute("select image, name, blogid from card");
        res.render("../views/admin/personallist", {
            blogs: blogs
        });

    }
    catch(err){
        console.log(err);
    }

    
});


// Admin panel listesinden silme işleminin teması,vazgeçmesi

router.get("/admin/delete/:blogid", async function(req, res){
    const blogid = req.params.blogid;

    try{
        const [blogs,] = await db.execute("select * from card where blogid=?", [blogid]);
        const blog = blogs[0];

        res.render("./admin/personaldelete", {
            blog: blog
        });
    }
    catch(err){
        console.log(err);
    }
})


// Admin panel listesinden silme işleminin post işlemi verin idye göre


router.post("/admin/delete/:blogid", async function(req, res){
    const blogid = req.body.blogid;

    try{
       
        await db.execute("delete from card where blogid=?", [blogid]);
        res.redirect("/admin/personals");

    }
    catch(err){
        console.log(err);
    }


})







module.exports = router;