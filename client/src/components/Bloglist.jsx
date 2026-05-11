import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import Blogcard from "./Blogcard";
import { useAppContext } from "../CONTEXT/Appcontext";

const Bloglist = () => {
  const [menu, setMenu] = useState("All");
  const { blog, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") {
      return blog;
    }
    return blog.filter(
      (b) =>
        b.title.toLowerCase().includes(input.toLowerCase()) ||
        b.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      {/* Categories */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((b) => (menu === "All" ? true : b.category.toLowerCase() === menu.toLowerCase()))
          .map((b) => (
            <Blogcard key={b._id} blog={b} />
          ))}
      </div>
    </div>
  );
};

export default Bloglist;
