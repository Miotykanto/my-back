

var fs=require("fs")
var y=3
module.exports.Get=function(req, res) {

    res.setHeader('Content-Type', 'text/plain');

    res.send('Vous êtes à l\'accueil');

}

module.exports.Getliste=function(req, res,app) {
    
    res.setHeader('Content-Type', 'text/plain');
    
    try{
           var d= fs.readFileSync('./model/note.json','utf-8')
        //    var test=JSON.parse(d)
        //    for(let i=0;i<test.length;i++){ 
        //        let b=test[i].image
        //        app.get(b,function(req,resp){
        //            try{
        //             var t='.'+b
        //             var f=fs.readFileSync(t)
        //             resp.write(f)
        //             resp.end()
        //            }catch(e){
        //             console.log(e.stack);
        //            }
           
        //        })
        //    }
            res.send(JSON.parse(d))
            
            res.end()
    }catch(e){
         console.log(e.stack);
    }

}

module.exports.Postliste=function(request, res) {
    var nom = request.body.nom; 
    var prenom = request.body.prenom; 
    var id =request.body.id; 
    y=y+1
   

    try{
        var b=fs.readFileSync('./model/note.json','utf-8')
       var c=  JSON.parse(b)
       var d= y
        c.push({id:d,nom:nom,prenom:prenom})
        res.send(c)
        fs.writeFileSync('./model/note.json', JSON.stringify(c))

       
       
    }catch(z){
        console.log(z.stack);
    }
  
    console.log(c);
  }


  module.exports.Putliste= function(request,resp){
    var nom = request.body.nom; 
    var prenom = request.body.prenom; 
    var id =request.body.id; 
    var b=fs.readFileSync('./model/note.json','utf-8')
    var c=  JSON.parse(b)
    for(let i=0;i<c.length;i++){
        if(c[i].id==id){
            if(nom){
                c[i].nom=nom
            }
            if(prenom){    
                c[i].prenom=prenom
            }
            
        }
    }
    resp.send(c)
    fs.writeFileSync('./model/note.json', JSON.stringify(c))

    console.log(typeof image);
    
}

module.exports.Deleteliste=function(req,res){
    var id=req.body.id;
    var b=fs.readFileSync('./model/note.json','utf-8')
    var c= JSON.parse(b)
    c.splice(parseInt(id),1)
    res.send(JSON.stringify(c))
    fs.writeFileSync('./model/note.json', JSON.stringify(c))

    console.log(typeof image);
}