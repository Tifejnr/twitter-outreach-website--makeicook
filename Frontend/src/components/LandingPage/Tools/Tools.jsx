import ToolBlueprint from "./Tool-Blueprint";
import { allToolsArray } from "./allToolsArray";

export default function ToolsSection() {
  return (
    <section className="tools-section-cont">
      <header>
        <h2>
          Top 6 reasons people make more sales with twitter outreach extension
        </h2>
      </header>

      {allToolsArray.map((toolDetails, index) => (
        <ToolBlueprint key={index} toolDetails={toolDetails} indexNo={index} />
      ))}
    </section>
  );
}
