export const SampleChats = [
  {
    avatar: ["https://www.w3schools.com/w3css/img_avatar2.png"],
    name: "gravatar",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/w3css/img_avatar3.png",
    ],
    name: "User 2",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
];
export const SampleUsers = [
  {
    avatar: "https://www.w3schools.com/w3css/img_avatar2.png",
    name: "gravatar",
    _id: "1",
  },
  {
    avatar: 
      "https://www.w3schools.com/w3css/img_avatar2.png",
    
    name: "User 2",
    _id: "2",
  },
];
export const SampleNotifications = [
  {
    sender:{
      avatar: "https://www.w3schools.com/w3css/img_avatar2.png",
    name: "gravatar",
    },
    _id: "1",
  },
  {
    sender:{
      avatar: "https://www.w3schools.com/w3css/img_avatar2.png",

    name: "User 2",
    },
    _id: "2",
  },
];
export const SampleMessages = [
  {
    attachments:[
      {
        public_id:'1',
        url:'https://www.w3schools.com/w3css/img_avatar2.png'
      },
    ],
    content:'kya huwa',
    _id:'a1',

    sender: {
      _id: "b1",
      name: "gravatar",
    },
    chat: "c1",
    createdAt:'2024-02-12'
  },
  {
    attachments:[
      {
        public_id:'2',
        url:'https://www.w3schools.com/w3css/img_avatar4.png'
      },
    ],
    content:'kya huwa rey',
    _id:'a2',

    sender: {
      _id: "b2",
      name: "Soumya",
    },
    chat: "c2",
    createdAt:'2024-02-12'
    
   
  },
];
