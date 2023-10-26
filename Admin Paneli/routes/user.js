const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../data/db");


const data = {
    title : "Anasayfa",
    blogs5:[

        {
            blogid: 1,
            name: "ARDA ŞAHBAZ",
            image: "personal1.jpeg",
            detays:"10 yildir sporla uğraşiyorum. 4 yildir aktif personal trainerlik yapiyorum.",
            anasayfa: true
        },

        {
            blogid: 2,
            name: "TESTO TAYLAN",
            image: "personal1.jpeg",
            detays:"10 yildir sporla uğraşiyorum. 4 yildir aktif personal trainerlik yapiyorum.",
            anasayfa: true
        },


        {
            blogid: 3,
            name: "GÖKALAF",
            image: "personal1.jpeg",
            detays:"10 yildir sporla uğraşiyorum. 4 yildir aktif personal trainerlik yapiyorum.",
            anasayfa: true
        },

        {
            blogid: 4,
            name: "HAKAN",
            image: "personal1.jpeg",
            detays:"10 yildir sporla uğraşiyorum. 4 yildir aktif personal trainerlik yapiyorum.",
            anasayfa: false
        },

        {
            blogid: 5,
            name: "KEREM",
            image: "personal1.jpeg",
            detays:"10 yildir sporla uğraşiyorum. 4 yildir aktif personal trainerlik yapiyorum.",
            anasayfa: false
        },

        


    ]
}



router.use("/personal/:blogid", async function(req, res) {
    const id = req.params.blogid;
    const [blog, ] = await db.execute("select * from card where blogid=?", [id]);

    if(blog){
      return  res.render("../views/users/personaldetay");
    }
    
  

});



router.use("/personal", async function(req, res) {

    try {
        const [blogs, ] = await db.execute("select * from card")
             res.render("../views/users/personal" , {
               title : "Personal Trainerlar",
                    blogs: blogs
                });
         }      
           
            catch(err){
                console.log(err);
            }



});



router.use("/", async function(req, res) {

  try {
    const [blogs, ] = await db.execute("select * from card where anasayfa=1")
            res.render("../views/users/index" , {
                title : "Anasayfa",
                blogs: blogs
            });
     }      
       
        catch(err){
            console.log(err);
        }
   
});


module.exports = router;