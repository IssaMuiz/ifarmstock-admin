const Home = () => {
  return (
    <main className="flex flex-col mx-auto justify-center">
      <div>
        <h1>Welcome to the iFarmStock Admin</h1>
        <p>Only Admin can have access to this page</p>
      </div>

      <button className="bg-green-600 w-max">Sign in with Google</button>
    </main>
  );
};

export default Home;
