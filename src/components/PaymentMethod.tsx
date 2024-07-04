import Input from "./Input";

interface PaymentMethodProps {
  updatePdfData: (field: string, value: string) => void;
}

const PaymentMethod = ({ updatePdfData }: PaymentMethodProps) => {
  const handleBankEntityChange = (value: string) => {
    updatePdfData("bankEntity", value);
  };

  const handleAccountNOChange = (value: string) => {
    updatePdfData("accountNO", value);
  };

  const handleSortCodeChange = (value: string) => {
    updatePdfData("sortCode", value);
  };

  const handleIBANChange = (value: string) => {
    updatePdfData("IBAN", value);
  };
  return (
    <>
      <div className="my-company-container">
        <div className="my-company-header">Payment method</div>
        <label className="my-company-form-subheading">
          How would you like to get paid?
        </label>
        <Input
          label="Bank entity"
          placeholder="Bank of England"
          inputValue={(value) => {
            handleBankEntityChange(value);
          }}
        />
        <Input
          label="Account number"
          placeholder="31510604"
          inputValue={(value) => {
            handleAccountNOChange(value);
          }}
        />
        <Input
          label="Sort-code"
          placeholder="100000"
          inputValue={(value) => {
            handleSortCodeChange(value);
          }}
        />
        <Input
          label="IBAN"
          placeholder="GB24BKEN10000031510604"
          inputValue={(value) => {
            handleIBANChange(value);
          }}
        />
      </div>
    </>
  );
};

export default PaymentMethod;
