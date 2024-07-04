import useLoadImageBase64 from "../util/useLoadImageBase64";

interface Props {
  currency: string;
}

const CurrencyLogo = ({ currency }: Props) => {
  return (
    <>
      {/* USD */}
      {currency === "USD" && (
        <div className="pdf-payment-method-currency-container">
          <img
            className="pdf-payment-method-currency-logo"
            src={useLoadImageBase64(
              "/assets/United-states_flag_icon_round.svg"
            )}
          />
          <div>
            <div className="pdf-payment-method-currency-name">US Dollar</div>
            <div>USD</div>
          </div>
        </div>
      )}

      {/* EUR */}
      {currency === "EUR" && (
        <div className="pdf-payment-method-currency-container">
          <img
            className="pdf-payment-method-currency-logo"
            src={useLoadImageBase64("/assets/Europe_flag_circle.png")}
          />
          <div>
            <div className="pdf-payment-method-currency-name">Euro</div>
            <div>EUR</div>
          </div>
        </div>
      )}

      {/* GBP */}
      {currency === "GBP" && (
        <div className="pdf-payment-method-currency-container">
          <img
            className="pdf-payment-method-currency-logo"
            src={useLoadImageBase64(
              "/assets/United-kingdom_flag_icon_round.svg"
            )}
          />
          <div>
            <div className="pdf-payment-method-currency-name">
              British Pounds
            </div>
            <div>GBP</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrencyLogo;
