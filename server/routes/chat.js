import  express  from 'express';
import { getMyProfile, login, logout, newUsers, searchUser } from '../controllers/user.js';
import {multerUpload} from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, getMyChat, getMyGroups, newGroupChat } from '../controllers/chat.js';

const app = express.Router();




app.use(isAuthenticated);
// below this user must be login 
app.post('/new',newGroupChat);
app.get("/my", getMyChat);
app.get("/my/groups", getMyGroups);
app.put('/addmembers',addMembers);

export default app;