import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
const Header = ({
  title,
  col,
  className,
  paraClassName,
  children,
  desc,
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
            {title}
          </motion.h1>
          {children}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={` ${paraClassName} max-w-full w-full text-sm space-y-4 text-cream/80`}
        >
          <div dangerouslySetInnerHTML={{ __html: desc }} />
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
