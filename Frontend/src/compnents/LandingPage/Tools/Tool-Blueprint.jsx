import React from "react";
import ToolVideo from "../videos/templates/toolVideo";
import { allToolsVideosObj } from "../videos/allToolsVideos";

export default function ToolBlueprint(props) {
  return (
    <section className="each-tool-section">
      <h2>
        <span>{props.indexNo + 1}.</span> {props.toolDetails.heading}
      </h2>

      <article>
        <p></p>
        <p>{props.toolDetails.overview}</p>
      </article>

      <article>
        <h3>Classic way of doing it in Trello</h3>
        <ToolVideo videoUrl={allToolsVideosObj.addingToBoardClassicWay} />
        <ul>
          <h3>Drawbacks</h3>
          <li>
            <p>
              Desired boards can't be selected on a single page, hence the need
              to navigate multiple boards one after the other.
            </p>
          </li>
          <li>
            <p>
              Boring as hell, especially when you need to repeat it for large
              amount of boards.
            </p>
          </li>
          <li>
            <p>
              Time wasting, it takes around 7 seconds to add a member to a
              board, Our tool takes around 0.3 seconds to do the same.
            </p>
          </li>
          <li>
            <p>
              Increased screen time which can cause eye strain, and reduced
              productivity.
            </p>
          </li>
        </ul>
      </article>

      <article>
        <h3>Collab for Trello way of doing it</h3>
        <ToolVideo
          videoUrl={allToolsVideosObj.addingToBoardCollabForTrelloVid}
        />
        <ul>
          <h3>Benefits of choosing this</h3>
          <li>
            <p>
              All Desired boards can be selected on a single page, hence no need
              to navigate multiple boards one after the other.
            </p>
          </li>
          <li>
            <p>
              Automation process can be continued even without your activity,
              you can switch to other tabs while automation continues
            </p>
          </li>
          <li>
            <p>
              Extremely fast, Our tool takes around 0.3 seconds to add a member
              to a board. That level of speed is humanly impossible to attain.
            </p>
          </li>
          <li>
            <p>Increased productivity.</p>
          </li>
        </ul>
      </article>
    </section>
  );
}
