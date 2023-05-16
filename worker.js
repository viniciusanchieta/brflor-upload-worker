self.importScripts('https://cdn.jsdelivr.net/npm/xlsx@0.17.3/dist/xlsx.full.min.js');

self.onmessage = function(event) {
  const file = event.data;
  const reader = new FileReaderSync();
  const data = reader.readAsBinaryString(file);
  const workbook = XLSX.read(data, {type: 'binary'});

  const sheetDataArray = workbook.SheetNames.map(function(sheetName) {
    const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    return {sheetName: sheetName, XL_row_object: XL_row_object};
  });

  self.postMessage(sheetDataArray);
};
