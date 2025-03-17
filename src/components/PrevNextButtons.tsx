import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { ButtonCustom } from "./ButtonCustom";
import { Button } from "./ui/button";

export const PrevButton = ({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) => {
  return (
    <ButtonCustom
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="backdrop-blur-sm uppercase !py-6 !px-4   "
    >
      {" "}
      <div className=" bg-main text-black  p-1 rounded-full mx-2">
        <ArrowLeft className="h-4 w-4    " />
      </div>
      Prev
    </ButtonCustom>
  );
};
export const NextButton = ({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) => {
  return (
    <ButtonCustom
      variant="outline"
      onClick={onClick}
      size="default"
      disabled={disabled}
      className="backdrop-blur-sm hover:text-white uppercase  !py-6 !px-4  bg-main text-main2 font-semibold special-font"
    >
      Next{" "}
      <div className="bg-main2 text-main  p-1 rounded-full mx-2">
        <ArrowRight className="h-4 w-4    " />
      </div>
    </ButtonCustom>
  );
};
export const HomeButton = ({ onClick, exit = false }: { onClick: () => void; exit?: boolean }) => {
  return (
    <Button
      onClick={onClick}
      variant="default"
      size="lg"
      className="fixed !px-4 !py-6 cursor-pointer  hover:bg-main2/40 hover:text-gray-800 bottom-8 right-36 duration-200 rounded-full text-white bg-main2 z-50 backdrop-blur-sm"
    >
      {exit ? <img src="/icon.svg" className=" h-5 w-5 object-contain" /> : <Home className="h-10 w-10" />}
    </Button>
  );
};
