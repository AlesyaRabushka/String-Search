import { config } from "dotenv";
config();
import express from "express";
import { searchRouter } from "./search/search.router";
import cors from "cors";

const PORT = Number(process.env.PORT) || 3004;

function bootstrap(){
    try {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({
            extended:true,
        }));
        app.use(cors());


        app.use('/search', searchRouter)

        app.listen(PORT, () => {
            console.log(`[SERVER STARTED] server listen to http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error);

        throw error;
    }
}

bootstrap();



// get('кфе', 'Мама очень любит кофе, поэтому я тоже его люблю!')