const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-black">
      <h1 className="text-center text-lg md:text-4xl p-4">
        Ritesh Maharjan <span>&copy; {date}</span>
      </h1>
    </footer>
  );
};

export default Footer;
