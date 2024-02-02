import tmdbImg from "../assets/images/tmdb.webp";

const About = () => {
  return (
    <main className="flex items-center justify-center flex-col gap-10 md:text-3xl text-center md:max-w-4xl px-5">
      <h1 className="text-xl my-5 md:my-10 md:text-6xl hover:scale-110">
        Movie <span className="text-orange-400">Database</span>(Mv
        <span className="text-orange-400">DB</span>)
      </h1>
      <p>
        Welcome to Movie Database created with love using TypeScript, Tailwind
        CSS, React and Framer Motion. Go to place to find out all the new and
        old movies in the world.
      </p>
      <p>
        Bookmark your favorite movies or the movies you want to see in the
        future. Stay tuned as I look forward to bring out more stuffs in the
        website.
      </p>

      <img src={tmdbImg} alt="TMDB API Logo" />
      <p>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </p>
    </main>
  );
};

export default About;
