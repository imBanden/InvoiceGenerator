import { useState } from "react";
import BlueBorders from "./BlueBorders";
import CurrencyLogo from "./CurrencyLogo";
import CurrencySymbol from "./CurrencySymbol";
import EmptyInputCanvas from "./EmptyInputCanvas";
import EmptyInputCanvasRound from "./EmptyInputCanvasRound";
import HoverHeaders from "./HoverHeaders";
import useLoadImageBase64 from "../util/useLoadImageBase64";

interface Props {
  position: { x: number; y: number };
  pdfData: {
    [key: string]: any;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
  setPdfRef: (element: HTMLDivElement | null) => void;
}
const MyPdfMain = ({
  position,
  pdfData,
  currentPage,
  onPageChange,
  setPdfRef,
}: Props) => {
  const [hoveringPageNumber, setHoveringPageNumber] = useState<number>(99);

  const handleSubtotal = (): number => {
    const itemList = pdfData.items;
    let subtotal = 0;
    if (itemList) {
      for (let item of itemList) {
        subtotal += item.price * item.quantity;
      }
      return subtotal;
    }

    return subtotal;
  };

  const handleTax = (): number => {
    const tax = pdfData.tax;

    if (tax) {
      return ((handleSubtotal() - pdfData.discount) * tax) / 100;
    }

    return 0;
  };

  const handleTotal = (): number => {
    return handleSubtotal() - pdfData.discount + handleTax();
  };

  return (
    <>
      <div
        className="pdf-main-container-move"
        style={{
          transform: `translate(${position.x / 50}px, ${position.y / 50}px)`,
        }}
      >
        {currentPage === 5 && <BlueBorders />}
        <div
          className={`pdf-scan-animation-container ${
            pdfData.downloadButton ? "scanner-box-appears" : ""
          }`}
        >
          <div
            className={`pdf-scan-animation-gradient-line ${
              pdfData.downloadButton ? "scanner-down-animation" : ""
            }`}
          ></div>
        </div>
        <div ref={setPdfRef} id="divToPrint" className="pdf-main-container">
          {/* {position.x}, {position.y} */}

          {/* invoice term-container */}
          {/* {currentPage === 5 && <BlueBorders />} */}
          <div
            className="pdf-invoice-term-container pdf-containers"
            onClick={() => onPageChange(4)}
            onMouseEnter={() => setHoveringPageNumber(4)}
            onMouseLeave={() => setHoveringPageNumber(99)}
          >
            <HoverHeaders
              pageNum={5}
              label="Invoice terms"
              currHoverNum={hoveringPageNumber}
            />

            {currentPage === 4 && <BlueBorders />}
            <div className="pdf-invoice-term-subcontainer">
              <div className="grey-text">
                INVOICE NO<div className="black-text">{pdfData.invoiceNO}</div>
              </div>
            </div>
            <div className="pdf-invoice-term-subcontainer pad-40">
              <div className="grey-text">
                ISSUED<div className="black-text">{pdfData.issuedDate}</div>
              </div>
              <div className="grey-text">
                DUE DATE<div className="black-text">{pdfData.dueDate}</div>
              </div>
            </div>
          </div>

          {/* your company and your client container */}
          <div className="pdf-your-company-your-client-container">
            {/* your company */}

            <div
              className="pdf-your-company-your-client-subcontainer pdf-containers"
              onClick={() => onPageChange(0)}
              onMouseEnter={() => setHoveringPageNumber(0)}
              onMouseLeave={() => setHoveringPageNumber(99)}
            >
              <HoverHeaders
                pageNum={1}
                label="Your company"
                currHoverNum={hoveringPageNumber}
              />

              {currentPage === 0 && <BlueBorders />}
              <div>FROM</div>
              <div className="pdf-your-company-your-client-logo-container">
                {pdfData.companyLogoImage ? (
                  <img
                    className="pdf-your-company-your-client-logo"
                    src={pdfData.companyLogoImage}
                  />
                ) : (
                  <EmptyInputCanvasRound height={45} width={45} />
                )}
              </div>
              <div className="pdf-your-company-your-client-company-name">
                {pdfData.companyName ? (
                  <div>{pdfData.companyName}</div>
                ) : (
                  <EmptyInputCanvas height={20} width={160} />
                )}
              </div>
              <div className="pdf-your-company-your-client-email">
                {pdfData.companyEmail ? (
                  <div>{pdfData.companyEmail}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={140} />
                )}
              </div>
              <div>
                {pdfData.companyAddress ? (
                  <div>{pdfData.companyAddress}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={120} />
                )}
              </div>
              <div>
                {pdfData.companyCity || pdfData.companyPostCode ? (
                  <div>
                    {pdfData.companyCity}
                    {pdfData.companyCity && pdfData.companyPostCode && ","}{" "}
                    {pdfData.companyPostCode}
                  </div>
                ) : (
                  <EmptyInputCanvas height={16} width={80} />
                )}
              </div>
              <div>
                {pdfData.companyCountry ? (
                  <div>{pdfData.companyCountry}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={80} />
                )}
              </div>
              <div>
                {pdfData.companyTaxID ? (
                  <div>Tax ID: {pdfData.companyTaxID}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={50} />
                )}
              </div>
            </div>

            {/* your client */}
            <div
              className="pdf-your-company-your-client-subcontainer pdf-containers"
              onClick={() => onPageChange(1)}
              onMouseEnter={() => setHoveringPageNumber(1)}
              onMouseLeave={() => setHoveringPageNumber(99)}
            >
              <HoverHeaders
                pageNum={2}
                label="Your client"
                currHoverNum={hoveringPageNumber}
              />

              {currentPage === 1 && <BlueBorders />}
              <div>TO</div>
              <div className="pdf-your-company-your-client-logo-container">
                {pdfData.clientLogoImage ? (
                  <img
                    className="pdf-your-company-your-client-logo"
                    src={pdfData.clientLogoImage}
                  />
                ) : (
                  <EmptyInputCanvasRound height={45} width={45} />
                )}
              </div>
              <div className="pdf-your-company-your-client-company-name">
                {pdfData.clientName ? (
                  <div>{pdfData.clientName}</div>
                ) : (
                  <EmptyInputCanvas height={20} width={160} />
                )}
              </div>
              <div className="pdf-your-company-your-client-email">
                {pdfData.clientEmail ? (
                  <div>{pdfData.clientEmail}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={140} />
                )}
              </div>
              <div>
                {pdfData.clientAddress ? (
                  <div>{pdfData.clientAddress}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={120} />
                )}
              </div>
              <div>
                {pdfData.clientCity || pdfData.clientPostCode ? (
                  <div>
                    {pdfData.clientCity}
                    {pdfData.clientCity && pdfData.clientPostCode && ","}{" "}
                    {pdfData.clientPostCode}
                  </div>
                ) : (
                  <EmptyInputCanvas height={16} width={80} />
                )}
              </div>
              <div>
                {pdfData.clientCountry ? (
                  <div>{pdfData.clientCountry}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={80} />
                )}
              </div>
              <div>
                {pdfData.clientTaxID ? (
                  <div>Tax ID: {pdfData.clientTaxID}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={50} />
                )}
              </div>
            </div>
          </div>

          {/* invoice details container */}
          <div
            className="pdf-invoice-details-container pdf-containers"
            onClick={() => onPageChange(2)}
            onMouseEnter={() => setHoveringPageNumber(2)}
            onMouseLeave={() => setHoveringPageNumber(99)}
          >
            <HoverHeaders
              pageNum={3}
              label="Invoice details"
              currHoverNum={hoveringPageNumber}
            />

            {currentPage === 2 && <BlueBorders />}

            <div className="pdf-invoice-details-header-container">
              <div className="pdf-invoice-details-header-left">DESCRIPTION</div>
              <div className="pdf-invoice-details-header-right">QTY</div>
              <div className="pdf-invoice-details-header-right">PRICE</div>
              <div className="pdf-invoice-details-header-right">AMOUNT</div>
            </div>

            {/* <div className="pdf-invoice-details-item-container">
            <div className="pdf-invoice-details-item-left">banana</div>
            <div className="pdf-invoice-details-item-right">1</div>
            <div className="pdf-invoice-details-item-right">$5.00</div>
            <div className="pdf-invoice-details-item-right">$4.00</div>
          </div> */}

            {pdfData.items &&
              pdfData.items.map((item, index) => (
                <div className="pdf-invoice-details-item-container" key={index}>
                  <div className="pdf-invoice-details-item-left">
                    {item.name}
                  </div>
                  <div className="pdf-invoice-details-item-right">
                    {item.quantity && parseInt(item.quantity)}
                  </div>
                  <div className="pdf-invoice-details-item-right">
                    <CurrencySymbol currency={pdfData.currency} />
                    {item.price && `${parseInt(item.price).toFixed(2)}`}
                  </div>
                  <div className="pdf-invoice-details-item-right">
                    <CurrencySymbol currency={pdfData.currency} />
                    {item.quantity && item.price
                      ? (
                          parseInt(item.quantity) * parseInt(item.price)
                        ).toFixed(2)
                      : "0.00"}
                  </div>
                </div>
              ))}

            <div className="pdf-invoice-details-options-container">
              <div className="pdf-invoice-details-options-left">
                <div className="pdf-invoice-details-options-note">Note</div>
                <div className="pdf-invoice-details-options-note-content">
                  {pdfData.note}
                </div>
              </div>
              <div className="pdf-invoice-details-options-right">
                <div className="pdf-invoice-details-options-list">
                  <div>Subtotal</div>
                  <div>
                    <CurrencySymbol currency={pdfData.currency} />
                    {handleSubtotal().toFixed(2)}
                  </div>
                </div>
                <div className="pdf-invoice-details-options-list">
                  <div>Discount</div>
                  <div>
                    <CurrencySymbol currency={pdfData.currency} />
                    {pdfData.discount.toFixed(2)}
                  </div>
                </div>
                <div className="pdf-invoice-details-options-list">
                  <div>Tax({pdfData.tax}%)</div>
                  <div>
                    <CurrencySymbol currency={pdfData.currency} />
                    {handleTax().toFixed(2)}
                  </div>
                </div>
                <div className="pdf-invoice-details-options-list">
                  <div>Total</div>
                  <div className="pdf-invoice-details-options-total">
                    <CurrencySymbol currency={pdfData.currency} />
                    {handleTotal().toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* payment-method-container */}
          <footer
            className="pdf-payment-method-container pdf-containers"
            onClick={() => onPageChange(3)}
            onMouseEnter={() => setHoveringPageNumber(3)}
            onMouseLeave={() => setHoveringPageNumber(99)}
          >
            <HoverHeaders
              pageNum={4}
              label="Payment methods"
              currHoverNum={hoveringPageNumber}
            />

            {currentPage === 3 && <BlueBorders />}

            {/* paymethod-method-left containers */}
            <div className="pdf-payment-method-left">
              <div>PAYABLE IN</div>
              <CurrencyLogo currency={pdfData.currency} />
              <div className="footer-message">
                Powered by{" "}
                <span>
                  <img
                    className="maji-lab-logo"
                    src={useLoadImageBase64("src/assets/maji-labs-logo.svg")}
                  />
                </span>
              </div>
            </div>

            {/* paymethod-method-right containers */}
            <div className="pdf-payment-method-right">
              <div>INSTRUCTIONS</div>
              {pdfData.bankEntity ? (
                <div className="black-text">{pdfData.bankEntity}</div>
              ) : (
                <EmptyInputCanvas height={16} width={154} />
              )}

              <div className="pdf-payment-method-list">
                <div>Account</div>
                {pdfData.accountNO ? (
                  <div>{pdfData.accountNO}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={154} />
                )}
              </div>
              <div className="pdf-payment-method-list">
                <div>Sort code</div>
                {pdfData.sortCode ? (
                  <div>{pdfData.sortCode}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={154} />
                )}
              </div>
              <div className="pdf-payment-method-list">
                <div>IBAN</div>
                {pdfData.IBAN ? (
                  <div>{pdfData.IBAN}</div>
                ) : (
                  <EmptyInputCanvas height={16} width={154} />
                )}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default MyPdfMain;
