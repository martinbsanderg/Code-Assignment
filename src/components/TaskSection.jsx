export const TaskSection = ({ title, style, children }) => {
  return (
    <div style={style}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
