const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-black h-12 md:h-20 flex items-center justify-center">
      <h1 className="text-center text-lg md:text-4xl">
        Ritesh Maharjan <span>&copy; {date}</span>
      </h1>
    </footer>
  );
};

export default Footer;
