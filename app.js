const wrapper = document.querySelector(".wrapper"),
  textEl = wrapper.querySelector("h3"),
  btnBrowse = wrapper.querySelector(".browse"),
  inputFile = wrapper.querySelector("input");

let file;

btnBrowse.addEventListener("click", () => inputFile.click());
inputFile.addEventListener("change", ({ target }) => {
  file = target.files[0];
  wrapper.classList.add("active");
  showFile();
});

wrapper.addEventListener("dragover", (e) => {
  e.preventDefault();

  wrapper.classList.add("active");
  textEl.innerText = "Upload The File";
});

wrapper.addEventListener("dragleave", () => {
  wrapper.classList.remove("active");
  textEl.innerText = "Drag & Drop To File";
});

wrapper.addEventListener("drop", (e) => {
  e.preventDefault();

  file = e.dataTransfer.files[0];
  showFile();
});

const showFile = () => {
  let fileType = file.type;

  const variantTypeFiles = ["image/jpeg", "image/jpg", "image/png"];
  if (variantTypeFiles.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="image">`;
      //   console.log(imgTag);
      wrapper.innerHTML = imgTag;
    });
    fileReader.readAsDataURL(file);
  } else {
    alert("This Is not A Image File!");
    wrapper.classList.remove("active");
    textEl.innerText = "Drag & Drop To File";
  }
};
