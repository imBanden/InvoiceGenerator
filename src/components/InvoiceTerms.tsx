import { useEffect } from "react";
import Input from "./Input";
import getCurrentDate from "./GetCurrentDate";

interface InvoiceTermsProps {
  updatePdfData: (field: string, value: string) => void;
}

const InvoiceTerms = ({ updatePdfData }: InvoiceTermsProps) => {
  // const getCurrentDate = ({ offset = 0 }) => {
  //   const now = new Date();
  //   now.setDate(now.getDate() + offset);
  //   const year = now.getFullYear();
  //   const month = (now.getMonth() + 1).toString().padStart(2, "0");
  //   const day = now.getDate().toString().padStart(2, "0");

  //   return `${year}-${month}-${day}`;
  // };

  const handleInvoiceNOChange = (value: string) => {
    updatePdfData("invoiceNO", value);
  };

  const handleIssuedDate = (value: string) => {
    updatePdfData("issuedDate", value);
  };

  const handleDueDate = (value: string) => {
    updatePdfData("dueDate", value);
  };

  useEffect(() => {
    handleInvoiceNOChange("00000001");
    handleIssuedDate(getCurrentDate({ offset: 0 }));
    handleDueDate(getCurrentDate({ offset: 13 }));
  }, []);

  return (
    <>
      <div className="my-company-container">
        <div className="my-company-header">Invoice Terms</div>

        <label className="my-company-form-subheading">One more step!</label>

        <Input
          label="Invoice number"
          placeholder="00000001"
          inputValue={(value) => {
            handleInvoiceNOChange(value);
          }}
        />

        <div className="label-input-container">
          <label className="my-company-form-labels">Issue date</label>
          <input
            className="invoice-terms-inputs"
            type="date"
            defaultValue={getCurrentDate({ offset: 0 })}
            onChange={(event) => handleIssuedDate(event.target.value)}
          />
        </div>

        <div className="label-input-container">
          <label className="my-company-form-labels">Due date</label>
          <input
            className="invoice-terms-inputs"
            type="date"
            defaultValue={getCurrentDate({ offset: 13 })}
            onChange={(event) => handleDueDate(event.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default InvoiceTerms;
