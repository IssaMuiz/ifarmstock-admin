const Home = () => {
  return (
    <main className="flex flex-col mx-80 items-center mt-60">
      <h1 className="text-3xl font-semibold">
        Welcome to the iFarmStock Admin
      </h1>
      <p className="text-lg">Only Admin can have access to this page</p>

      <button className="bg-green-600 w-max p-2 text-white text-lg rounded-md font-semibold mt-5">
        Sign in with Google
      </button>
    </main>
  );
};

export default Home;
