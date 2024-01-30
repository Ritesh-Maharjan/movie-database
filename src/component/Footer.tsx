const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer>
      <p className="text-center md:text-4xl p-4">
        Ritesh Maharjan <span>&copy; {date}</span>
      </p>
    </footer>
  );
};

export default Footer;
