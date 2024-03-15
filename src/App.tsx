import Input from "./Input";

export default function App() {
  const handleChange = (value: string) => {
    console.log(value);
  };
  return (
    <div
      className="
      flex flex-col items-center justify-center h-screen
    "
    >
      <div style={{ width: 200 }}>
        <Input onChange={handleChange} type="text" />
      </div>
    </div>
  );
}
