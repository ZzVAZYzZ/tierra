import React from "react";

const useViewport = () => {
  // const [width, setWidth] = React.useState(window.innerWidth);
<<<<<<< HEAD
  const [width, setWidth] = React.useState(0);
=======
   const [width, setWidth] = React.useState(0);
>>>>>>> 340173087d8917f22f1c39af073ed3a9f86b8c03

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};

export default useViewport;
