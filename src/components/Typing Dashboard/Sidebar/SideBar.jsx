// import { NavLink } from "react-router-dom";
// import { FaBars, FaHome, FaUser } from "react-icons/fa";
// import { MdMessage } from "react-icons/md";
// import { BiSearch } from "react-icons/bi";
// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import SidebarMenu from "./SidebarMenu";

// const routes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: <FaHome />,
//   },
//   {
//     path: "/create-blog",
//     name: "Create Blog",
//     icon: <FaUser />,
//   },
//   {
//     path: "/all-blogs",
//     name: "All Blogs",
//     icon: <MdMessage />,
//   },
// ];

// const SideBar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
  
//   const inputAnimation = {
//     hidden: {
//       width: 0,
//       padding: 0,
//       transition: {
//         duration: 0.2,
//       },
//     },
//     show: {
//       width: "140px",
//       padding: "5px 15px",
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   const showAnimation = {
//     hidden: {
//       width: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     show: {
//       opacity: 1,
//       width: "auto",
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <div className="flex w-full m-0 p-0 box-border">
//       <motion.div
//         animate={{
//           width: isOpen ? "200px" : "45px",
//           transition: {
//             duration: 0.5,
//             type: "spring",
//             damping: 10,
//           },
//         }}
//         className="bg-[rgb(0,7,61)] text-white h-screen overflow-y-auto fixed left-0 top-0 z-10"
//       >
//         <div className="flex items-center justify-between p-4">
//           <AnimatePresence>
//             {isOpen && (
//               <motion.h1
//                 variants={showAnimation}
//                 initial="hidden"
//                 animate="show"
//                 exit="hidden"
//                 className="text-lg leading-none"
//               >
//                 Typing
//               </motion.h1>
//             )}
//           </AnimatePresence>

//           <div className="w-8">
//             <FaBars onClick={toggle} className="cursor-pointer" />
//           </div>
//         </div>
        
//         <div className="flex items-center my-2 mx-0 h-8 px-2">
//           <div className="flex items-center">
//             <BiSearch />
//           </div>
//           <AnimatePresence>
//             {isOpen && (
//               <motion.input
//                 initial="hidden"
//                 animate="show"
//                 exit="hidden"
//                 variants={inputAnimation}
//                 type="text"
//                 placeholder="Search"
//                 className="border-none ml-2 rounded bg-gray-200 text-black"
//               />
//             )}
//           </AnimatePresence>
//         </div>
        
//         <section className="mt-4 flex flex-col gap-1">
//           {routes.map((route, index) => {
//             if (route.subRoutes) {
//               return (
//                 <SidebarMenu
//                   key={index}
//                   setIsOpen={setIsOpen}
//                   route={route}
//                   showAnimation={showAnimation}
//                   isOpen={isOpen}
//                 />
//               );
//             }

//             return (
//               <NavLink
//                 to={route.path}
//                 key={index}
//                 className={({ isActive }) => 
//                   `flex text-white gap-2 py-1 px-2 border-r-4 ${
//                     isActive 
//                       ? "border-r-white bg-[rgb(45,51,89)]" 
//                       : "border-transparent hover:border-r-white hover:bg-[rgb(45,51,89)]"
//                   } transition-all duration-200`
//                 }
//               >
//                 <div className="flex items-center">{route.icon}</div>
//                 <AnimatePresence>
//                   {isOpen && (
//                     <motion.div
//                       variants={showAnimation}
//                       initial="hidden"
//                       animate="show"
//                       exit="hidden"
//                       className="whitespace-nowrap text-sm"
//                     >
//                       {route.name}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </NavLink>
//             );
//           })}
//         </section>
//       </motion.div>

//       <main className="w-full pl-12 sm:pl-14 md:pl-16">
//         <div className="p-4 w-full">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SideBar;



import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser, FaBlog } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/admin/create-blog",
    name: "Create Blog",
    icon: <FaUser />,
  },
  {
    path: "/admin/all-blogs",
    name: "All Blogs",
    icon: <FaBlog />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex w-full m-0 p-0 box-border">
      <motion.div
        animate={{
          width: isOpen ? "200px" : "45px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className="bg-[rgb(0,7,61)] text-white h-screen overflow-y-auto fixed left-0 top-0 z-10"
      >
        <div className="flex items-center justify-between p-4">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="text-lg leading-none"
              >
                Typing
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="w-8">
            <FaBars onClick={toggle} className="cursor-pointer" />
          </div>
        </div>
        
        <div className="flex items-center my-2 mx-0 h-8 px-2">
          <div className="flex items-center">
            <BiSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.input
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={inputAnimation}
                type="text"
                placeholder="Search"
                className="border-none ml-2 rounded bg-gray-200 text-black"
              />
            )}
          </AnimatePresence>
        </div>
        
        <section className="mt-4 flex flex-col gap-1">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  key={index}
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                />
              );
            }

            return (
              <NavLink
                to={route.path}
                key={index}
                className={({ isActive }) => 
                  `flex text-white gap-2 py-1 px-2 border-r-4 ${
                    isActive 
                      ? "border-r-white bg-[rgb(45,51,89)]" 
                      : "border-transparent hover:border-r-white hover:bg-[rgb(45,51,89)]"
                  } transition-all duration-200`
                }
              >
                <div className="flex items-center">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="whitespace-nowrap text-sm"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
      </motion.div>

      <main className="w-full pl-12 sm:pl-14 md:pl-16">
        <div className="p-4 w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SideBar;