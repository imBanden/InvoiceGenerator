interface Props {
  pageNum: number;
  label: string;
  currHoverNum: number;
}

const HoverHeaders = ({ pageNum, label, currHoverNum }: Props) => {
  return (
    <>
      <div
        className={`hover-headers ${
          currHoverNum === pageNum - 1 ? "ani-fade-in" : ""
        }`}
      >
        <div className="hover-headers-number">
          <div>{pageNum}</div>
        </div>
        <div>{label}</div>
      </div>
    </>
  );
};

export default HoverHeaders;
