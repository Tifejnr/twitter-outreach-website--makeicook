import ToolBlueprint from "./Tool-Blueprint";
import { allToolsArray } from "./allToolsArray";

export default function ToolsSection() {
  return (
    <section className="tools-section-cont">
      <header>
        <h2>
          Top 7 reasons users of this extension make more sales during twitter
          outreach
        </h2>
      </header>

      {allToolsArray.map((toolDetails, index) => (
        <ToolBlueprint key={index} toolDetails={toolDetails} indexNo={index} />
      ))}
    </section>
  );
}
