import dotenv from "dotenv";
dotenv.config();

export const config ={
    server:{
        port:process.env.PORT,
        secretSession:process.env.SECRET_SESSION
    },
    mongo:{
        url:process.env.MONGO_URL
    },
    github:{
        clientId:process.env.clientId,
        clientSecret:process.env.clientSecret,
        callbackUrl:process.env.callbackUrl,
    }
} 