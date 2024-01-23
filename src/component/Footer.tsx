const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <div>
      <p className="text-center">
        Ritesh Maharjan <span>&copy; {date}</span>
      </p>
    </div>
  );
};

export default Footer;
