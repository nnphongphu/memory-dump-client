let exportB64 = undefined;

mergeImages([], {
  width: 400,
  height: 600,
}).then((b64) => {
  exportB64 = b64;
});

window.electronAPI.onChangeSelectedImage((_event, images) => {
  let imageObject = [];
  images.forEach((image, index) => {
    imageObject.push({
      src: image.url,
      width: 200,
      height: 200,
      x: 200 * (index % 2),
      y: Math.floor(index / 2) * 200,
    });
  });
  mergeImages(imageObject, {
    width: 400,
    height: 600,
  }).then((b64) => {
    document.querySelector("img").src = b64;
    exportB64 = b64;
  });
});

document.querySelector("button").onclick = () => {
  if (exportB64) window.electronAPI.export(exportB64);
};

document.querySelector("span").onclick = () => {
  window.electronAPI.showPreview();
};
