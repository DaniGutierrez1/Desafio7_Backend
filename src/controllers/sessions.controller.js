import { usersDao } from "../constants/index.js";
import passport from "passport";


export class SessionController{
    static renderRegister=async(req,res)=>{
        passport.authenticate("signupStrategy",{
            failureRedirect:"/api/sessions/fail-signup"
        }),(req,res)=>{
            res.render("login",{message:"usuario registrado"})
        }
    };

    static renderLogin=async(req,res)=>{
        passport.authenticate("loginStrategy",{
            failureRedirect:"/api/sessions/fail-login"
        }),(req,res)=>{
            res.redirect("/perfil")
        }
    };

    static renderFailSignup=async(req,res)=>{
        res.render("signup",{error:"No se pudo registrar el usuario"})
    };

    static renderFailLogin=async(req,res)=>{
        res.render("login",{error:"Credenciales invalidas"})
    };

    static renderChangePassword=async(req,res)=>{
        try {
            const form=req.body;
            const user = await userService.getByEmail(form.email);
            if(!user){
                return res.render("changePassword",{error:
                "No se pudo cambiar la contraseña"})
            }
            user.password=createHash(form.newPassword);
            await userService.update(user._id,user);
            return res.render("login", {message:"Contraseña restaurada"});
        } catch (error) {
            res.render("changePassword",{error:error.message});
        }
    };

    static renderLoginGithub=async(req,res)=>{
        passport.authenticate("githubLoginStrategy")
    }

    static renderLoginGithubCallback=async(req,res)=>{
        passport.authenticate("githubLoginStrategy",{
            failureRedirect:"/fail-signup"
        }),(req,res)=>{
            res.render("profile")
        }
    }

    static renderLogout = (req,res)=>{
        req.logOut(error=>{
            if(error){
                return res.render("profile",{user: req.user, error: "No se pudo cerrar la sesión"})
            }else{
                req.session.destroy(error=>{
                    if(error)return res.render("profile",{user: req.session.userInfo, error: "No se pudo cerrar la sesión"})
                    res.redirect("/login");
                })
            }
        })
    };
}