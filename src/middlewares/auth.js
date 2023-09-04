export const checkUserAuthenticated = (req,res,next)=>{
    if(req.session?.userInfo){
        next();
    }else{
        res.redirect("/login");
    }
};

export const showProductsView = (req,res,next)=>{
    if(req.session?.userInfo){
        res.redirect("/products");
    }else{
        next();
    }
};
