const Home = () => {
  return (
    <main className="flex flex-col justify-center">
      <div>
        <h1>Welcome to the iFarmStock Admin</h1>
        <p>Only Admin can have access to this page</p>
      </div>

      <button>Sign in with Google</button>
    </main>
  );
};

export default Home;
