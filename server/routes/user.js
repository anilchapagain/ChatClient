import  express  from 'express';
import { getMyProfile, login, logout, newUsers, searchUser } from '../controllers/user.js';
import {multerUpload} from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js';

const app = express.Router();

app.post('/new', multerUpload.single('avatar'), newUsers );
app.post("/login", login);


app.use(isAuthenticated);
// below this user must be login 
app.get( '/me', getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);

export default app;