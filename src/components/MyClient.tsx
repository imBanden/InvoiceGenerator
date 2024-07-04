import ImageUploader from "./ImageUploader";
import Input from "./Input";

interface MyClientProps {
  updatePdfData: (field: string, value: string) => void;
}

const MyClient = ({ updatePdfData }: MyClientProps) => {
  const handleEmailChange = (value: string) => {
    updatePdfData("clientEmail", value);
  };

  const handleNameChange = (value: string) => {
    updatePdfData("clientName", value);
  };

  const handleAddressChange = (value: string) => {
    updatePdfData("clientAddress", value);
  };

  const handleCityChange = (value: string) => {
    updatePdfData("clientCity", value);
  };
  const handlePostCodeChange = (value: string) => {
    updatePdfData("clientPostCode", value);
  };
  const handleCountryChange = (value: string) => {
    updatePdfData("clientCountry", value);
  };
  const handleTaxIDChange = (value: string) => {
    updatePdfData("clientTaxID", value);
  };

  const handleImageChange = (value: string) => {
    updatePdfData("clientLogoImage", value);
  };
  return (
    <>
      <div className="my-company-container">
        <div className="my-company-header">Your client</div>

        <label className="my-company-form-subheading">
          Enter your client's details
        </label>

        <Input
          label="Email"
          placeholder="e.g.info@acne.inc"
          inputValue={(value) => {
            handleEmailChange(value);
          }}
        />

        <div className="my-company-form-message">
          We'll fill the billing details automatically if we find the company.
        </div>
        <label className="my-company-form-subheading">Billing details</label>
        <Input
          label="Company name"
          placeholder="Acme Inc"
          inputValue={(value) => {
            handleNameChange(value);
          }}
        />
        <ImageUploader label="Logo" imgSrc={(src) => handleImageChange(src)} />
        <Input
          label="Address"
          placeholder="10 Downing Street"
          inputValue={(value) => {
            handleAddressChange(value);
          }}
        />
        <Input
          label="City"
          placeholder="London"
          inputValue={(value) => {
            handleCityChange(value);
          }}
        />
        <Input
          label="Post code"
          placeholder="SW1A 2AA"
          inputValue={(value) => {
            handlePostCodeChange(value);
          }}
        />
        <Input
          label="Country"
          placeholder="United Kingdom"
          inputValue={(value) => {
            handleCountryChange(value);
          }}
        />
        <Input
          label="Tax ID"
          placeholder="AB123456D"
          inputValue={(value) => {
            handleTaxIDChange(value);
          }}
        />
      </div>
    </>
  );
};

export default MyClient;
