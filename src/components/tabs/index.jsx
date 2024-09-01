export default function Tabs({ currentMode, onChangeMode }) {
  return (
    <div className="flex mb-4 space-x-4">
      <button
        className={`px-4 py-2 rounded ${
          currentMode === "pomodoro"
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => onChangeMode("pomodoro")}
      >
        Pomodoro
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentMode === "shortBreak"
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => onChangeMode("shortBreak")}
      >
        Short Break
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentMode === "longBreak"
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => onChangeMode("longBreak")}
      >
        Long Break
      </button>
    </div>
  );
}
