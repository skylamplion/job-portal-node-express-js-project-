//imports
//API Documentation
import swaggerJsDoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';

import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

//secqurity package
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

//files import
import connectDB from './config/db.js';

//routes imports
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import jobsRoutes from './routes/jobsRoutes.js'
import userRoutes from './routes/userRoutes.js';

//dotenv config
dotenv.config()

//mongodb connection
connectDB()

//swagger api config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'job Portal Application',
            discription: 'node exxpressjs job portal applcation'
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ]
    },
    apis: ["./routes/*.js"],

}

const spec = swaggerJsDoc(options)

//dotenv config for if dotenv file is in other folder 
//dotenv.config({path:'.path'})


//rest object
const app = express();

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);

//homeroute root
app.use("/api-doc", SwaggerUi.serve, SwaggerUi.setup(spec))


//validation middleware
app.use(errorMiddleware)

//port 
const PORT = process.env.PORT || 8000

//listen
app.listen(PORT, () => {
    console.log(`server Start at ${PORT} in ${process.env.DEV_MODE}`.bgBlue.white)
});