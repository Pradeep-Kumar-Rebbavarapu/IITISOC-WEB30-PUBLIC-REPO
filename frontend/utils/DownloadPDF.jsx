import { jsPDF } from "jspdf";

export const downloadImagesAsPDF = (BoardMap) => {
  const firstPageNumber = Array.from(BoardMap.keys())[0];
  const firstImage = new Image();
  const imgSrc = BoardMap.get(firstPageNumber);

  firstImage.onload = function () {
    const imgWidth = firstImage.width;
    const imgHeight = firstImage.height;

    const aspectRatio = imgWidth / imgHeight;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let pdfWidth, pdfHeight;
    let scale = 1;

    if (aspectRatio >= 1) {
      // Landscape image
      pdfWidth = screenWidth;
      pdfHeight = screenWidth / aspectRatio;
    } else {
      // Portrait image
      pdfWidth = screenHeight * aspectRatio;
      pdfHeight = screenHeight;
      scale = screenHeight / pdfHeight;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [pdfWidth, pdfHeight],
    });

    Array.from(BoardMap.keys()).forEach((pageNumber, index) => {
      const img = new Image();
      img.onload = function () {
        if (pageNumber !== firstPageNumber) {
          doc.addPage();
        }

        doc.addImage(this, "JPEG", 0, 0, pdfWidth, pdfHeight, "", "FAST", scale);

        if (index === BoardMap.size - 1) {
          doc.save("images.pdf");
        }
      };

      img.src = BoardMap.get(pageNumber);
    });
  };

  firstImage.src = imgSrc;
};



export const getImageSizeInKB = (base64ImageUrl) => {
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    const base64Data = base64ImageUrl.replace(/^data:image\/\w+;base64,/, '');
  
    // Calculate the size in bytes
    const byteSize = atob(base64Data).length;
  
    // Convert bytes to kilobytes (KB)
    const sizeInKB = byteSize / 1024;
  
    return sizeInKB;
  };