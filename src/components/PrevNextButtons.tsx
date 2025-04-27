import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { ButtonCustom } from "./ButtonCustom";
import { Button } from "./ui/button";
import { useEffect, useCallback } from "react";

// PREV BUTTON
export const PrevButton = ({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !disabled) {
        onClick();
      }
    },
    [disabled, onClick]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ButtonCustom
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="backdrop-blur-sm uppercase !py-6 !px-4"
    >
      <div className="bg-main text-black p-1 rounded-full mx-2">
        <ArrowLeft className="h-4 w-4" />
      </div>
      Prev
    </ButtonCustom>
  );
};

// NEXT BUTTON
export const NextButton = ({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && !disabled) {
        onClick();
      }
    },
    [disabled, onClick]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ButtonCustom
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      size="default"
      className="backdrop-blur-sm hover:text-white uppercase !py-6 !px-4 bg-main text-main2 font-semibold special-font"
    >
      Next
      <div className="bg-main2 text-main p-1 rounded-full mx-2">
        <ArrowRight className="h-4 w-4" />
      </div>
    </ButtonCustom>
  );
};

// HOME BUTTON
export const HomeButton = ({ onClick, exit = false }: { onClick: () => void; exit?: boolean }) => {
  return (
    <Button
      onClick={onClick}
      variant="default"
      size="lg"
      className="fixed !px-4 !py-6 cursor-pointer hover:bg-main2/40 hover:text-gray-800 bottom-8 right-36 duration-200 rounded-full text-white bg-main2 z-50 backdrop-blur-sm"
    >
      {exit ? (
        <img src="/icon.svg" className="h-5 w-5 object-contain" />
      ) : (
        <Home className="h-10 w-10" />
      )}
    </Button>
  );
};
