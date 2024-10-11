import express, { Express } from "express";
import bodyParser from 'body-parser' //Body Parser
import methodOverride  from 'method-override'  // Method Overide
import * as routeClient  from './routes/client/index.route' // Route Client
import * as routeAdmin  from './routes/admin/index.route' // Route Admin
import dotenv from 'dotenv'; // Env
dotenv.config();  // Env
import { connect } from './config/database' // Kết nối database online
import path from 'path'; // path Tiny-MCE
const app:Express = express();
const port: number = parseInt(process.env.PORT) || 3000;


app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug')

connect(); // Kết nối database online

// Body Parser 
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
// Hết body Parser

app.use(methodOverride('_method')) // // Method Override -> override with POST having ?_method=DELETE


routeClient.index(app); // Route Client
routeAdmin.index(app); // Route Admin

app.use(express.static(`${__dirname}/public`)) // Nhúng file tĩnh

app.locals.admin = process.env.admin // Tạo biến toàn cục

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));  // Tiny-MCE /* New Route to the TinyMCE Node module */

app.listen(port, () => {
	console.log(`Đang lắng nghe cổng ${port}`);
})