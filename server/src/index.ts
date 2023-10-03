import express from "express";

const PORT = Number(process.env.PORT) || 3004;

function bootstrap(){
    try {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({
            extended:true,
        }))

        app.listen(PORT, () => {
            console.log(`[SERVER STARTED] server listen to http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error);

        throw error;
    }
}

bootstrap();