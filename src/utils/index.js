export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const createNewNote = (title) => {
  const data = {
    timestamp: Math.floor(Date.now() / 1000),
    blocks: [{ type: "header", data: { text: title, level: 2 } }],
    version: "2.20.2",
  };

  return JSON.stringify(data);
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("upload_preset", "not_a_notion_clone");
  formData.append("file", file);

  const options = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(process.env.REACT_APP_UPLOAD_IMAGE_URL, options);
  const data = await response.json();
  return {
    success: 1,
    file: {
      url: data.secure_url,
    },
  };
};

export const applyTheme = (theme) => {
  Object.keys(theme).forEach((key) => {
    const value = theme[key];
    document.documentElement.style.setProperty(key, value);
  });
};
