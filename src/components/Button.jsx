/* eslint-disable react/prop-types */
function Button({
  type = "submit",
  children,
  bgColor = "bg-blue-500",
  textcolor = "text-black",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textcolor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
