import { Router } from "express";
import { userService } from "../constants/index.js";
//import { usersModel } from "../dao/models/user.model.js";

const router = Router();

router.post("/signup",async(req,res)=>{
    try {
        const signupForm=req.body;
        const user = await userService.getByEmail(signupForm.email);
        
        if(user){
            return res.render("signup",{error:"Este usuario ya existe"});
        }

        
        const result = await userService.save(signupForm);
        res.render("login",{message:`usuario ${result.first_name}registrado`});
       
        
    } catch (error) {
        res.render("signup",{error:error.message});
    }
});

router.post("/login",async(req,res)=>{
    try {
        const loginForm=req.body;
        const user = await userService.getByEmail(loginForm.email);
         
        if(!user){
            return res.render("login",{error:"Este usuario no existe"});
        };
        if(user.password === loginForm.password){
            req.session.userInfo= {
                first_name:user.first_name,
                email:user.email
            };
            
            res.redirect("/perfil",{message:"Bienvenido"});
        }else{
            return res.render("login",{error:"Credenciales invalidas"})
        };
        const result = await userService.save(signupForm);
        res.render("login",{message:`usuario ${result.first_name}registrado`});
       
        
    } catch (error) {
        res.render("signup",{error:error.message});
    }
});

router.get("/logout",(req,res)=>{
    req.session.destroy(error=>{
        if(error)return res.render("profile",{user: req.session.userInfo, error: "No se pudo cerrar la sesión"})
        res.redirect("/login");
    })
});

export { router as sessionsRouter}