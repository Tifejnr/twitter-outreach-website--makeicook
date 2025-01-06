import ToolBlueprint from "./Tool-Blueprint";
import { allToolsArray } from "./allToolsArray";

export default function ToolsSection() {
  return (
    <section className="tools-section-cont">
      <header>
        <h2>
          Top 5 reasons users get more responses and make more sales with
          Twitter (X) Prospecting tool
        </h2>
      </header>

      {allToolsArray.map((toolDetails, index) => (
        <ToolBlueprint key={index} toolDetails={toolDetails} indexNo={index} />
      ))}
    </section>
  );
}
