const Home = () => {
  return (
    <main className="flex flex-col mx-80 items-center mt-60">
      <h1 className="text-3xl font-bold">Welcome to the iFarmStock Admin</h1>
      <p className="text-lg font-semibold">
        Only Admin can have access to this page
      </p>

      <button className="bg-green-600 w-max p-2 text-white text-lg rounded-md font-semibold mt-2 hover:bg-green-700">
        Sign in with Google
      </button>
    </main>
  );
};

export default Home;
