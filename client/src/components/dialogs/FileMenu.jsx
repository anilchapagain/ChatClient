/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import { AudioFile, FileUpload, Image, VideoFile } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorE1,chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const closeFileMenu = () => dispatch(setIsFileMenu(false));
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const selectRef = (ref) => {
    ref.current.click();
  };

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length <= 0) return;
    if (files.length > 5) return toast.error("Can only send 5 files at a time");
    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key} ....`);
    closeFileMenu();

try {
  const myForm = new FormData();
  myForm.append("chatId",chatId);

files.forEach((file) => myForm.append("files",file))

  const res = await sendAttachments(myForm);
  if(res.data) toast.success(`${key} sent successfully`);
  else toast.error(`Failed to send ${key}`)
} catch (error) {
  toast.error(error,{id:toastId})
}
finally{
  dispatch(setUploadingLoader(false))
}



  };
  return (
    <Menu open={isFileMenu} onClose={closeFileMenu} anchorEl={anchorE1}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          <MenuItem onClick={() => selectRef(imageRef)}>
            <Image />

            <ListItemText style={{ marginLeft: "0.5rem" }}>image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(audioRef)}>
            <AudioFile />

            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mp3,audio/mpeg,audio/wav"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audio")}
              ref={audioRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(videoRef)}>
            <VideoFile />

            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(fileRef)}>
            <FileUpload />

            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
