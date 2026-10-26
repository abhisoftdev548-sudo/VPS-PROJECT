import 'dotenv/config'
import app from './app.js';
import { ENV } from './config/env_config.js';

const port = ENV.PORT || 3000;


app.listen(port, ()=>{
    console.log(`Server is running on port ${port} \n\n visit : http://localhost:${port} `)
})  