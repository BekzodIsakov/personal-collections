import sprite from "../assets/sprite.svg";

const SVG = ({ iconId, size, ...props }) => {
  return (
    <svg width={size} height={size} {...props}>
      <use xlinkHref={`${sprite}#${iconId}`} />
    </svg>
  );
};

export default SVG;
