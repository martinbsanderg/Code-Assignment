import { colours } from "nodemon/lib/config/defaults";
import "./App.css";
import { AtomsCounting } from "./components/Task 1/AtomsCounting";
import { B64Encoding } from "./components/Task 2/B64Encoding";
import { Header } from "./components/Header";
import { TaskSection } from "./components/TaskSection";

function App() {
  return (
    <div style={{ marginBottom: "15em" }}>
      <Header />
      <div className="wrapper">
        <TaskSection
          style={{ marginTop: "34px" }}
          title={"Task 1: Counting Atoms in Molecules"}
        >
          <AtomsCounting />
        </TaskSection>

        <TaskSection
          title={"Task 2: Encoding to Base64"}
          style={{ marginTop: "60px" }}
        >
          <B64Encoding />
        </TaskSection>
      </div>
    </div>
  );
}

export default App;
