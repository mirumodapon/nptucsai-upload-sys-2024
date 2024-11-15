function HomePage() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">專題上傳系統</h1>
          <p className="py-6">
            Department of Computer Science and Artificial Intelligence at National Pingtung University
          </p>
          <a href="/api/auth/google" className="btn btn-primary">Get Started</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
