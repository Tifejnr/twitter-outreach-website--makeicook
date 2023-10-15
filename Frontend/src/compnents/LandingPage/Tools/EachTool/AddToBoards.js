import { allToolsVideosObj } from "../../videos/allToolsVideos";
const heading = "Add team members to boards tool";
const overview =
  "This tool allows addition of Trello team members to multiple Trello boards at once, eliminating the need to perform the task manually for each board.";

const drawBacksList = [
  {
    list: "Desired boards can't be selected on a single page, hence the need to navigate multiple boards one after the other.",
  },
  {
    list: "Boring as hell, especially when you need to repeat it for large amount of boards.",
  },
  {
    list: "Time wasting, it takes around 7 seconds to add a member to a board, Our tool takes around 0.3 seconds to do the same.",
  },
  {
    list: "Increased screen time which can cause eye strain, and reduced productivity.",
  },
];

const benefitsList = [
  {
    list: "All Desired boards can be selected on a single page, hence no need to navigate multiple boards one after the other.",
  },
  {
    list: "Automation process can be continued even without your activity, you can switch to other tabs while automation continues",
  },
  {
    list: "Extremely fast, Our tool takes around 0.3 seconds to add a member to a board. That level of speed is humanly impossible to attain.",
  },
  {
    list: "Increased productivity.",
  },
];

const collabForTrelloWayVideoUrl =
  allToolsVideosObj.addingToBoardCollabForTrelloVid;

const classicWayVideoUrl = allToolsVideosObj.addingToBoardClassicWay;

export const addToBoardsToolDetails = {
  heading,
  overview,
  benefitsList,
  drawBacksList,
  collabForTrelloWayVideoUrl,
  classicWayVideoUrl,
};
