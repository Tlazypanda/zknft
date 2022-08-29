import { Navbar, Welcome, Footer, Services, Transactions, Notifications } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    {/* <Services /> */}
    <Notifications />
    <Transactions />
    <Footer />
  </div>
);

export default App;
