import { jsPDF } from "jspdf";
const PDFGenerator = () => {
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
  return <div>PDFGenerator</div>;
};

export default PDFGenerator;
