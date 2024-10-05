interface PriceDisplayProps {
  price: number;
}
const PriceDisplay: React.FC<PriceDisplayProps> = ({ price }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <span>
      <span>{formatPrice(price)}</span>
    </span>
  );
};

export default PriceDisplay;
