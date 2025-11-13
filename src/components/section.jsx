const Section = ({ children, className }) => (
  <section className={`flex flex-col p-3 w-fit ${className}`}>{children}</section>
);
const Head = ({ children }) => <div className="mb-2 flex gap-2 items-center">{children}</div>;
const Body = ({ children }) => (
  <div className="flex-1 h-0 overflow-auto">{children}</div>
);

Section.Head = Head;
Section.Body = Body;

export default Section;
