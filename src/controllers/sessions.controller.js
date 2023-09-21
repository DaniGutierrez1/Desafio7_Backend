import { usersDao } from "../constants/index.js";

export class SessionController{
    static renderRegister=async(req,res)=>{
        try {
            const signupForm=req.body;
            const user = await usersDao.getByEmail(signupForm.email);
            
            if(user){
                return res.render("signup",{error:"Este usuario ya existe"});
            }
    
            
            const result = await usersDao.save(signupForm);
            res.render("login",{message:`usuario ${result.first_name}registrado`});
           
            
        } catch (error) {
            res.render("signup",{error:error.message});
        }
    };

    static renderLogin=async(req,res)=>{
        try {
            const loginForm=req.body;
            const user = await usersDao.getByEmail(loginForm.email);
             
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
            const result = await usersDao.save(signupForm);
            res.render("login",{message:`usuario ${result.first_name}registrado`});
           
            
        } catch (error) {
            res.render("signup",{error:error.message});
        }
    };

    static renderLogout = (req,res)=>{
        req.session.destroy(error=>{
            if(error)return res.render("profile",{user: req.session.userInfo, error: "No se pudo cerrar la sesión"})
            res.redirect("/login");
        })
    };
}