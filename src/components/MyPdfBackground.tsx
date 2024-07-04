import MyPdfMain from "./MyPdfMain";
import { useEffect, useState } from "react";

interface MyPdfBackgroundProps {
  pdfData: {
    [key: string]: any;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
  setPdfRef: (element: HTMLDivElement | null) => void;
}

const MyPdfBackground = ({
  pdfData,
  currentPage,
  onPageChange,
  setPdfRef,
}: MyPdfBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  });

  return (
    <>
      <MyPdfMain
        setPdfRef={setPdfRef}
        position={{ x: mousePosition.x - 1013, y: mousePosition.y - 454 }}
        pdfData={pdfData}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          onPageChange(page);
        }}
      />
      <div className="pdf-background-container ani-move-left-right"></div>
    </>
  );
};

export default MyPdfBackground;
