import HumedadChart from "./components/chart";
import { PiPlantFill } from "react-icons/pi";

export default function Home() {
  return (
    <main>
      <nav className="bar">
        <h2 >Registro de Humedad del Suelo </h2> <h2><PiPlantFill/></h2>
      </nav>
      <HumedadChart />
    </main>
  );
}