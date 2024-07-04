import { useState } from "react";
// import Input from "./Input";
import NumberInput from "./NumberInput";

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceDetailsProps {
  updatePdfData: (field: string, value: any) => void;
}

const generateId = () => "_" + Math.random().toString(36).substring(2, 9);

const InvoiceDetails = ({ updatePdfData }: InvoiceDetailsProps) => {
  const [currencyOptionList, setCurrencyOptionList] = useState<boolean>(false);
  const [optionClicked, setOptionClicked] = useState<boolean>(false);
  const [currentCurrency, setCurrentCurrency] = useState<string>("USD");
  const [itemList, setItemList] = useState<Item[]>([
    { id: generateId(), name: "", quantity: 0, price: 0 },
  ]);

  const currencyImgSrc: { [key: string]: string } = {
    USD: "/assets/United-states_flag_icon_round.svg",
    EUR: "/assets/Europe_flag_circle.png",
    GBP: "/assets/United-kingdom_flag_icon_round.svg",
  };

  const addItem = () => {
    setItemList((prev) => [
      ...prev,
      { id: generateId(), name: "", quantity: 0, price: 0 },
    ]);
  };

  const removeItem = (itemID: string) => {
    const newItemList = itemList.filter((item) => item.id !== itemID);
    setItemList(newItemList);
    updatePdfData("items", newItemList);
  };

  const handleCurrencyChange = (value: string) => {
    updatePdfData("currency", value);
  };

  const handleNoteChange = (value: string) => {
    updatePdfData("note", value);
  };

  const handleDiscountChange = (value: number) => {
    updatePdfData("discount", value);
  };

  const handleTaxChange = (value: number) => {
    updatePdfData("tax", value);
  };

  const handleItemNameChange = (value: string, itemIndex: number) => {
    // console.log(value, itemIndex);
    const items = itemList;
    items[itemIndex].name = value;

    setItemList(items);
    updatePdfData("items", itemList);
  };

  const handleItemQuantityChange = (value: number, itemIndex: number) => {
    if (!value) {
      value = 0;
    }

    // console.log(value, itemIndex);
    const items = itemList;
    items[itemIndex].quantity = value;

    setItemList(items);
    updatePdfData("items", itemList);
  };

  const handleItemPriceChange = (value: number, itemIndex: number) => {
    if (!value) {
      value = 0;
    }
    // console.log(value, itemIndex);
    const items = itemList;
    items[itemIndex].price = value;

    setItemList(items);
    updatePdfData("items", itemList);
  };

  const handlePlaceHolderCurrency = (): string => {
    let symbol = "";

    if (currentCurrency === "USD") {
      symbol = "$";
    }
    if (currentCurrency === "EUR") {
      symbol = "€";
    }
    if (currentCurrency === "GBP") {
      symbol = "£";
    }

    return `${symbol}0.00`;
  };
  return (
    <>
      <div className="my-company-container">
        <div className="my-company-header">Invoice details</div>
        <div className="my-company-form-subheading">
          Select an invoice currency
        </div>

        {/* currency input */}
        <div className="currency-container">
          <button
            onClick={() => {
              currencyOptionList
                ? setCurrencyOptionList(false)
                : setCurrencyOptionList(true);
            }}
            className="currency-input-button"
          >
            <label className="my-company-form-labels">Currency</label>
            <div className="currency-input-flag-drop-container">
              <div className="currency-input-container">
                <img
                  className="currency-input-flag"
                  src={currencyImgSrc[currentCurrency]}
                ></img>
                <div className="currency-input-ticker">{currentCurrency}</div>
              </div>
              <img
                className={currencyOptionList ? "rotate0" : "rotate90"}
                src="/assets/MaterialSymbolsKeyboardArrowDown.svg"
              />
            </div>
          </button>
          <div
            className={`currency-drop-down-list ${
              currencyOptionList ? "pop-up" : ""
            }`}
          >
            {/* USD */}
            <button
              onClick={() => {
                setCurrentCurrency("USD");
                setCurrencyOptionList(false);
                handleCurrencyChange("USD");
              }}
              className="currency-drop-down-list-item"
            >
              <div className="currency-list-item-left">
                <img
                  className="currency-input-flag"
                  src={currencyImgSrc["USD"]}
                ></img>
                <div className="currency-input-name">US Dollar</div>
                <div className="currency-input-ticker">USD</div>
              </div>
              {currentCurrency === "USD" && (
                <img
                  className="currency-current-check"
                  src="assets\MaterialSymbolsCheckCircle.svg"
                ></img>
              )}
            </button>
            {/* EUR */}
            <button
              onClick={() => {
                setCurrentCurrency("EUR");
                setCurrencyOptionList(false);
                handleCurrencyChange("EUR");
              }}
              className="currency-drop-down-list-item"
            >
              <div className="currency-list-item-left">
                <img
                  className="currency-input-flag"
                  src={currencyImgSrc["EUR"]}
                ></img>
                <div className="currency-input-name">Euro</div>
                <div className="currency-input-ticker">EUR</div>
              </div>
              {currentCurrency === "EUR" && (
                <img
                  className="currency-current-check"
                  src="assets\MaterialSymbolsCheckCircle.svg"
                ></img>
              )}
            </button>
            {/* GBP */}
            <button
              onClick={() => {
                setCurrentCurrency("GBP");
                setCurrencyOptionList(false);
                handleCurrencyChange("GBP");
              }}
              className="currency-drop-down-list-item"
            >
              <div className="currency-list-item-left">
                <img
                  className="currency-input-flag"
                  src={currencyImgSrc["GBP"]}
                ></img>
                <div className="currency-input-name">British pound</div>
                <div className="currency-input-ticker">GBP</div>
              </div>
              {currentCurrency === "GBP" && (
                <img
                  className="currency-current-check"
                  src="assets\MaterialSymbolsCheckCircle.svg"
                ></img>
              )}
            </button>
          </div>
        </div>

        {/*Items container*/}
        <div className="my-company-form-subheading">Items</div>
        <div className="invoice-items-main-container">
          {itemList.map((item, index) => (
            <div key={item.id} className="invoice-items-list-container">
              <div className="invoice-item-container">
                <input
                  // value={item.name}
                  className="invoice-item-inputs"
                  placeholder="Item name"
                  onChange={(event) => {
                    handleItemNameChange(event.target.value, index);
                  }}
                />
                <input
                  // value={item.quantity}
                  type="number"
                  step="any"
                  className="invoice-item-inputs"
                  placeholder="Qty"
                  onChange={(event) => {
                    handleItemQuantityChange(
                      parseInt(event.target.value),
                      index
                    );
                  }}
                />
                <input
                  // value={item.price}
                  type="number"
                  step="any"
                  className="invoice-item-inputs"
                  placeholder="Price"
                  onChange={(event) => {
                    handleItemPriceChange(parseInt(event.target.value), index);
                  }}
                />
                <button
                  onClick={() => {
                    removeItem(item.id);
                  }}
                  className="invoice-item-delete-button"
                >
                  <img
                    className="invoice-item-delete-button-logo"
                    src="assets\MaterialSymbolsDeleteOutline.svg"
                  />
                </button>
              </div>
            </div>
          ))}

          <button onClick={addItem} className="invoice-item-add-button">
            <span className="spacer-right-20-px">+</span>Add item
          </button>
        </div>

        {/* notes */}
        <div className="my-company-form-subheading">Note</div>
        <input
          className="invoice-item-inputs"
          placeholder="Add a note"
          onChange={(event) => {
            handleNoteChange(event.target.value);
          }}
        />

        {/* more options section */}
        <button
          className="more-option-button"
          onClick={() => {
            optionClicked ? setOptionClicked(false) : setOptionClicked(true);
          }}
        >
          <div>More options</div>
          <img
            className={optionClicked ? "rotate0" : "rotate90"}
            src="assets\MaterialSymbolsKeyboardArrowDown.svg"
          ></img>
        </button>

        <div
          className={`more-options-container ${optionClicked ? "fade-in" : ""}`}
        >
          <NumberInput
            label="Discount"
            placeholder={handlePlaceHolderCurrency()}
            inputValue={(value) => {
              handleDiscountChange(value);
            }}
          />
          <NumberInput
            label="Tax"
            placeholder="0 %"
            inputValue={(value) => {
              handleTaxChange(value);
            }}
          />
        </div>

        {/* </form> */}
      </div>
    </>
  );
};

export default InvoiceDetails;
