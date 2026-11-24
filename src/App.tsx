import { useState } from "react";
import {
  useWindupString,
  WindupChildren,
  Pace,
  Pause,
  OnChar,
  Effect,
  useSkip,
  useRewind,
  useIsFinished,
} from "windups";
import "./App.css";

// Buttons that control the nearest <WindupChildren> through its hooks
function Controls() {
  const skip = useSkip();
  const rewind = useRewind();
  const isFinished = useIsFinished();
  return (
      <div className="controls">
        <button onClick={skip} disabled={isFinished}>Skip</button>
        <button onClick={rewind}>Replay</button>
      </div>
  );
}

// 1. A hook that returns the partly typed string
function HookDemo() {
  const [text, { skip, rewind, isFinished }] = useWindupString(
      "Hi! I'm being typed one character at a time by the useWindupString hook."
  );
  return (
      <section className="card">
        <h2>1. useWindupString</h2>
        <div className="controls">
          <button onClick={skip} disabled={isFinished}>Skip</button>
          <button onClick={rewind}>Replay</button>
        </div>
        <p className="output">{text}</p>
      </section>
  );
}

// 2. Typing JSX, not just strings
function ChildrenDemo() {
  return (
      <section className="card">
        <h2>2. WindupChildren</h2>
        <WindupChildren>
          <Controls />
          <p className="output">
            {"Windups can type "}
            <strong>{"bold"}</strong>
            {", "}
            <em>{"italic"}</em>
            {", and "}
            <span className="highlight">{"custom styled"}</span>
            {" text."}
          </p>
        </WindupChildren>
      </section>
  );
}

// 3. Controlling speed and adding pauses
function PaceDemo() {
  return (
      <section className="card">
        <h2>3. Pace and Pause</h2>
        <WindupChildren>
          <Controls />
          <p className="output">
            <Pace ms={25}>{"I can talk really fast... "}</Pace>
            <Pause ms={1000} />
            <Pace ms={200}>{"or reeeally slow."}</Pace>
          </p>
        </WindupChildren>
      </section>
  );
}

// 4. Callbacks per character, effects at a set point, and pausing
function EffectsDemo() {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [runId, setRunId] = useState(0);

  const countChar = () => setCount((c) => c + 1);
  const restart = () => {
    setCount(0);
    setNote("");
    setDone(false);
    setPaused(false);
    setRunId((id) => id + 1);
  };

  return (
      <section className="card">
        <h2>4. OnChar, Effect, isPaused</h2>
        <div className="controls">
          <button onClick={() => setPaused((p) => !p)} disabled={done}>
            {paused ? "Resume" : "Pause"}
          </button>
          <button onClick={restart}>Restart</button>
        </div>
        <p className="stats">
          Characters typed: {count} {done && "finished"}
        </p>
        {note && <p className="stats">{note}</p>}
        <WindupChildren key={runId} isPaused={paused} onFinished={() => setDone(true)}>
          <p className="output">
            <OnChar fn={countChar}>{"Every character fires a callback. "}</OnChar>
            <Effect fn={() => setNote("An <Effect> fired halfway through!")} />
            <OnChar fn={countChar}>{"Effects can run at any point, too."}</OnChar>
          </p>
        </WindupChildren>
      </section>
  );
}

// 5. Try your own text and speed
function Playground() {
  const [draft, setDraft] = useState("Type anything here, then press Play!");
  const [text, setText] = useState(draft);
  const [speed, setSpeed] = useState(50);
  const [runId, setRunId] = useState(0);

  const play = () => {
    setText(draft);
    setRunId((id) => id + 1); // a new key restarts the windup
  };

  return (
      <section className="card">
        <h2>5. Playground</h2>
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} />
        <label>
          Speed: {speed} ms per character
          <input
              type="range"
              min="10"
              max="300"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
        <button onClick={play}>Play</button>
        <WindupChildren key={runId}>
          <p className="output">
            <Pace ms={speed}>{text}</Pace>
          </p>
        </WindupChildren>
      </section>
  );
}

export default function App() {
  return (
      <main>
        <h1>Windups Demo</h1>
        <p className="subtitle">A typewriter effect library for React</p>
        <HookDemo />
        <ChildrenDemo />
        <PaceDemo />
        <EffectsDemo />
        <Playground />
      </main>
  );
}

