import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import { ImageUrl } from "@/constants";

interface Company {
  _id: string;
  title: string;
  content: string;
  photo: string;
}

interface Slide6Props {
  data: Company; // Receives company data directly
}

const Slide6 = ({ data }: Slide6Props) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>
      <div className="absolute inset-0">
        <img
          src={"/Rectangle 3 (5).png"}
          alt="Background Pattern"
          className="object-cover z-10 bg-fixed"
        />
      </div>
      <MaxWidthWrapper className="text-white gap-8 flex items-center justify-between z-30 relative container mx-auto">
        <div className="py-32 flex max-w-2xl flex-col gap-5 items-start">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={`${ImageUrl}/${data.photo}`}
            className="object-left w-80"
            alt={data.title}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="special-font text-5xl text-cream mb-2"
          >
            {data.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
        <div className="relative w-full z-50">
          <img
            src={ImageUrl + "/" + data.sideImage}
            className="object-left w-full h-auto rounded-2xl"
            alt={data.title}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide6;