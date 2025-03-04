import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
const Header = ({
  col,
  className,
  paraClassName,
  children,
}: {
  title: string;
  view?: boolean;
  desc: string;
  col?: boolean;
  className?: string;
  paraClassName?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <div className={`${col && "flex-col"} ${className && className} flex text-white items-start gap-8 `}>
        <div className="flex justify-between w-full items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={` ${className} !w-fit text-nowrap text-5xl special-font font-special`}
          >
            North Coast
          </motion.h1>
          {children}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={` ${paraClassName} max-w-full text-sm space-y-4 text-cream/80`}
        >
          <p>
            Q Developments was established in 2022 to engrave its signature in the Egyptian market for a lifetime by
            introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated
            services.
          </p>
          <p>
            Q Developments strives to provide affordable quality homes, exceptional experience & highest quality service
            to be presented to the Egyptian culture with a good return on investment.
          </p>{" "}
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
