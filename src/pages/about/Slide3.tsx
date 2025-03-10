import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { BACKEND_API } from "@/constants";
import { useNav } from "@/context/NavContext";
import { useEffect } from "react";

const Slide3 = ({ data }: { data?: any }) => {
  console.log(data);
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle(data.pageTitle || "Our CEO");
  }, []);
  return (
    <div className="relative min-h-screen  overflow-hidden">
      {/* Background Wave Pattern */}{" "}
      <div className="absolute h-full left-0 top-0 z-20 w-full bg-main2 mix-blend-multiply"></div>
      <div className="absolute inset-0 ">
        <img
          src={`${BACKEND_API}/${data.background}`}
          alt="Background Pattern"
          className="object-cover z-10 bg-fixed"
        />
      </div>
      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="flex items-center justify-between py-32">
          <div className="max-w-2xl">
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
          </div>

          <div className=" relative">
            <div className="relative w-[350px] h-[410px] rounded-lg  overflow-hidden">
              <img
                src={`${BACKEND_API}/${data.photo}`}
                alt="CEO"
                className="object-cover  right-0 absolute top-1/2 -translate-y-1/2  z-20 w-[76%] h-[80%]"
              />{" "}
            </div>
            <img
              src="/Vector (14).png"
              alt="Background Pattern"
              className="object-cover z-10 absolute inset-0 w-full h-full"
            />
            <div className=" -mt-8 pb-4  relative  ">
              <h2 className=" text-lg font-semibold   relative text-center  special-font text-main2 z-30">
                {data.title}
              </h2>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide3;
