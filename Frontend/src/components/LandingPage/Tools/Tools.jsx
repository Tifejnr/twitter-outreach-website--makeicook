import ToolBlueprint from "./Tool-Blueprint";
import { allToolsArray } from "./allToolsArray";

export default function ToolsSection() {
  return (
    <section className="tools-section-cont">
      <header>
        <h2>
          Top 5 Reasons Users Get More Responses and Make More Sales with
          Twitter (X) Prospecting Tool
        </h2>
      </header>

      {allToolsArray.map((toolDetails, index) => (
        <ToolBlueprint key={index} toolDetails={toolDetails} indexNo={index} />
      ))}
    </section>
  );
}
