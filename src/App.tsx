import { useRef, useState } from "react";
import "./App.css";
import InvoiceDetails from "./components/InvoiceDetails";
import InvoiceTerms from "./components/InvoiceTerms";
import MyClient from "./components/MyClient";
import MyCompany from "./components/MyCompany";
import MyPdfBackground from "./components/MyPdfBackground";
import PaymentMethod from "./components/PaymentMethod";
import ReviewAndDownload from "./components/ReviewAndDownload";
import getCurrentDate from "./components/GetCurrentDate";
import jsPDF from "jspdf";
import useLoadImageBase64 from "./util/useLoadImageBase64";

interface PDFData {
  [key: string]: any; // This allows additional fields to be added dynamically
}

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [pdfData, setPdfData] = useState<PDFData>({
    currency: "USD",
    invoiceNO: "00000001",
    discount: 0,
    issuedDate: getCurrentDate({ offset: 0 }),
    dueDate: getCurrentDate({ offset: 13 }),
    downloadButton: false,
  });

  const pages: string[] = [
    "My company",
    "My client",
    "Invoice details",
    "Payment method",
    "Invoice terms",
    "Review and download",
  ];

  const nextPage = () => {
    const newPage = currentPage + 1;

    if (newPage >= pages.length) {
      setCurrentPage(0);
    } else setCurrentPage(newPage);
  };

  const prevPage = () => {
    const newPage = currentPage - 1;

    if (newPage < 0) {
      setCurrentPage(pages.length - 1);
    } else setCurrentPage(newPage);
  };

  const updatePdfData = (field: string, value: any) => {
    setPdfData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // generate pdf function

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const setPdfRef = (element: HTMLDivElement | null) => {
    pdfRef.current = element;
  };

  const generatePDF = () => {
    // const invoiceListContainer: any = document.querySelector(
    //   ".pdf-invoice-details-container"
    // );
    // invoiceListContainer.style.overflowY = "visible";

    var elementToPrint = document.getElementById("divToPrint");

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const scaleFactor = 0.3425;

    // make sure all images are loaded
    const images = document.querySelectorAll("img");
    const promises = Array.from(images).map((image) => {
      return new Promise<void>((resolve, reject) => {
        if (image.complete) {
          resolve();
        } else {
          image.onload = () => resolve;
          image.onerror = () =>
            reject(new Error(`Error loading image ${image.src}`));
        }
      });
    });

    Promise.all(promises).then(() => {
      if (elementToPrint) {
        pdf.html(elementToPrint, {
          callback: function (pdf) {
            pdf.save("invoice-0000001");
          },
          x: 0,
          y: 0,
          width: 210,
          windowWidth: elementToPrint.offsetWidth * scaleFactor,
          html2canvas: {
            scale: scaleFactor,
          },
        });
      }
    });
    // invoiceListContainer.style.overflowY = "auto";

    updatePdfData("downloadButton", false);
  };

  return (
    <div className="main-container">
      <div className="main-container-left">
        {/* header */}
        <div className="main-container-header">
          <div className="main-container-header-container">
            <img
              className="main-container-header-image"
              src="src/assets/MaterialSymbolsDocumentScanner.svg"
            />
            <div className="main-container-header-words">
              <div className="main-container-header-words-invoice">
                Invoice Generator
              </div>
              <div className="main-container-header-words-majilabs">
                By{" "}
                <img
                  src={useLoadImageBase64("src/assets/maji-labs-logo.svg")}
                />
              </div>
            </div>
          </div>
        </div>

        {pages[currentPage] === "My company" && (
          <MyCompany updatePdfData={updatePdfData} />
        )}
        {pages[currentPage] === "My client" && (
          <MyClient updatePdfData={updatePdfData} />
        )}
        {pages[currentPage] === "Invoice details" && (
          <InvoiceDetails updatePdfData={updatePdfData} />
        )}
        {pages[currentPage] === "Payment method" && (
          <PaymentMethod updatePdfData={updatePdfData} />
        )}
        {pages[currentPage] === "Invoice terms" && (
          <InvoiceTerms updatePdfData={updatePdfData} />
        )}
        {pages[currentPage] === "Review and download" && (
          <ReviewAndDownload
            onButtonClick={() => {
              setTimeout(generatePDF, 1000);
              updatePdfData("downloadButton", true);
            }}
          />
        )}

        {/* next and prev page buttons */}
        <div className="main-nav-buttons-container">
          {pages[currentPage] != "My company" && (
            <button className="main-nav-buttons" onClick={prevPage}>
              <div className="nav-button-container">
                <img
                  className="main-nav-buttons-icon"
                  src="src\assets\MaterialSymbolsArrowBackIos.svg"
                />
                <div>Back</div>
              </div>
              <div className="nav-header">{pages[currentPage - 1]}</div>
            </button>
          )}

          {pages[currentPage] === "My company" && <div></div>}
          {pages[currentPage] != "Review and download" && (
            <button
              className="main-nav-buttons main-nav-buttons-right"
              onClick={nextPage}
            >
              <div className="nav-button-container">
                <div>Next</div>
                <img
                  className="main-nav-buttons-icon"
                  src="src\assets\MaterialSymbolsArrowForwardIos.svg"
                />
              </div>
              <div className="nav-header">{pages[currentPage + 1]}</div>
            </button>
          )}
        </div>
      </div>

      {/* main-container-right */}
      <div className="main-container-right">
        <MyPdfBackground
          setPdfRef={setPdfRef}
          pdfData={pdfData}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default App;
