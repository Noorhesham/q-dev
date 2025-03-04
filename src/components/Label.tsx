
const Label = ({ className, text }: { className?: string; text?: string }) => {
  return (
    <div>
      <div className={`${className || ""} flex items-stretch  absolute bottom-6 left-0`}>
        <img src="/Vector (18).png" alt="Q" className="w-[42px]  h-auto" />
        <h2
          className="text-2xl bg-main2 h-full special-font  px-10 py-2  rounded-r-2xl
     text-white font-semibold"
        >
          {text}
        </h2>
      </div>
    </div>
  );
};

export default Label;
