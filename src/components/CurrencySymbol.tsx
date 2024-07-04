interface Props {
  currency: string;
}

const CurrencySymbol = ({ currency }: Props) => {
  return (
    <>
      {currency === "USD" && <span>$</span>}
      {currency === "EUR" && <span>€</span>}
      {currency === "GBP" && <span>£</span>}
    </>
  );
};

export default CurrencySymbol;
