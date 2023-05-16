const fileInput = document.getElementById('file-input');
const progress = document.getElementById('progress');
const result = document.getElementById('result');
const download = document.getElementById('download');

fileInput.addEventListener('change', function(e) {
  console.time('readFile');
  progress.innerHTML = 'Uploading...';
  const file = e.target.files[0];

  const worker = new Worker('worker.js');
  worker.postMessage(file);

  worker.onmessage = function(event) {
    const fragment = document.createDocumentFragment();
    const data = event.data;

    data.forEach(function(sheetData) {
      const XL_row_object = sheetData.XL_row_object;
      console.log(XL_row_object.length);
      const json = JSON.stringify(XL_row_object);
      const blob = new Blob([json], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const aTag = document.createElement('a');

      aTag.download = sheetData.sheetName + '.json';
      aTag.href = url;
      aTag.textContent = 'Download ' + sheetData.sheetName + '.json';
      fragment.appendChild(aTag);
    });

    result.appendChild(fragment);
    progress.innerHTML = 'Done!';
    console.timeEnd('readFile');
  };

  worker.onerror = function(event) {
    console.log(event.message);
  };
});
