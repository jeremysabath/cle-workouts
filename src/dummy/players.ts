// Dummy player data and assets. Eventually, these will come via API.

import clarkson from "../assets/players/clarkson.png"
import delly from "../assets/players/delly.png"
import garland from "../assets/players/garland.png"
import henson from "../assets/players/henson.png"
import knight from "../assets/players/knight.png"
import love from "../assets/players/love.png"
import nance from "../assets/players/nance.png"
import cedi from "../assets/players/cedi.png"
import porterJr from "../assets/players/porter-jr.png"
import sexton from "../assets/players/sexton.png"
import thompson from "../assets/players/thompson.png"
import windler from "../assets/players/windler.png"
import zizic from "../assets/players/zizic.png"
import { Player } from "../types"

const players: Player[] = [
  {
    id: "clarkson",
    name: "Jordan Clarkson",
    nickname: "Jordan",
    imageSrc: clarkson,
    position: "Guard",
    number: "8",
  },
  {
    id: "delly",
    name: "Matthew Dellavedova",
    nickname: "Delly",
    imageSrc: delly,
    position: "Guard",
    number: "18",
  },
  {
    id: "garland",
    name: "Darius Garland",
    nickname: "Darius",
    imageSrc: garland,
    position: "Guard",
  },
  {
    id: "henson",
    name: "John Henson",
    nickname: "John",
    imageSrc: henson,
    position: "Forward-Center",
    number: "31",
  },
  {
    id: "knight",
    name: "Brandon Knight",
    nickname: "Brandon",
    imageSrc: knight,
    position: "Guard",
    number: "20",
  },
  {
    id: "klove123",
    name: "Kevin Love",
    nickname: "Kevin",
    imageSrc: love,
    position: "Forward-Center",
    number: "0",
  },
  {
    id: "nance",
    name: "Larry Nance Jr.",
    nickname: "Nance",
    imageSrc: nance,
    position: "Forward",
    number: "22",
  },
  {
    id: "cedi",
    name: "Cedi Osman",
    nickname: "Cedi",
    imageSrc: cedi,
    position: "Forward",
    number: "16",
  },
  {
    id: "porter",
    name: "Kevin Porter Jr.",
    nickname: "KP",
    imageSrc: porterJr,
    position: "Guard",
  },
  {
    id: "sexton",
    name: "Collin Sexton",
    nickname: "Sexton",
    imageSrc: sexton,
    position: "Guard",
    number: "2",
  },
  {
    id: "thompson",
    name: "Tristan Thompson",
    nickname: "TT",
    imageSrc: thompson,
    position: "Guard",
    number: "13",
  },
  {
    id: "wade",
    name: "Dean Wade",
    nickname: "Dean",
    position: "Forward",
  },
  {
    id: "windler",
    name: "Dylan Windler",
    nickname: "Dylan",
    imageSrc: windler,
    position: "Guard-Forward",
  },
  {
    id: "zizic",
    name: "Ante Zizic",
    nickname: "AZ",
    imageSrc: zizic,
    position: "Center",
    number: "41",
  },
]

export default players
