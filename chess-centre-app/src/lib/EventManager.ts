import {
  Meta,
  Settings,
  Player,
  SectionResults,
  Pairing,
  Result,
  Structure,
  SectionName,
  ManagedEvent,
} from "./Types";

const _defaults = {
  settings: {
    eventStructure: Structure.RoundRobin,
    sections: 3,
    currentRound: 1,
    totalRounds: 5,
    roundLive: false,
    showAll: false,
    showPreviousRound: false,
  },
  meta: {
    description: "",
    prizeGiving: "",
    nextRoundTime: {},
  },
};

export class ManagedEventFactory {
  private readonly _name: string;
  private readonly _eventId: string;
  private readonly _meta: Meta;
  private _settings: Settings;
  private _players: Player[];
  private _results: SectionResults[];
  private _pairings: Pairing[];
  private _stored: Boolean = false;

  private resultDefaults() {
    const rounds: Result[] = new Array(this._settings.totalRounds)
      .fill({})
      .map((_, index) => ({
        round: index + 1,
        pairResults: [],
      }));
    const sections: SectionResults[] = new Array(this._settings.sections)
      .fill({})
      .map((_, index) => ({
        section: index + 1,
        scores: rounds,
      }));
    return sections;
  }

  private fetchFromStorage(): ManagedEvent | null {
    if (this._eventId) {
      const eventData = window.localStorage.getItem(this._eventId);
      if (eventData) {
        this._stored = true;
        const storedData: ManagedEvent = JSON.parse(eventData);
        return storedData;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private save() {
    if (this._eventId) {
      window.localStorage.setItem(this._eventId, this.eventStateToJson());
    }
  }

  private generatePairings() {
    if (this._settings.eventStructure === Structure.RoundRobin) {
      this._pairings = SixPlayerPairings;
      this._stored = true;
    }
  }

  constructor(data: ManagedEvent) {
    const { settings, meta } = _defaults;
    this._name = data.name;
    this._eventId = data.eventId;
    this._meta = Object.assign({}, meta, data.meta);
    this._settings = Object.assign({}, settings, data.settings);
    this._players = data.players || [];
    this._pairings = data.pairings || [];
    this._results = this.resultDefaults();
    this.generatePairings();
    this.save();
  }

  set settings(settingInfo: Settings) {
    this._settings = settingInfo;
  }

  get settings(): Settings {
    return this._settings;
  }

  set players(players: Player[]) {
    this._players = players;
  }

  get players(): Player[] {
    return this._players;
  }

  set pairings(pairingList: Pairing[]) {
    this._pairings = pairingList;
  }

  get pairings(): Pairing[] {
    return this._pairings;
  }

  updatePlayer(
    id: number | null,
    memberId: string | null,
    playerInfo: Player
  ): void {
    const playerIndex = this._players.findIndex((p: Player) => {
      if (id) return p.id === id;
      if (memberId) return p.memberId === memberId;
      return null;
    });
    const previousPlayerRecord = this._players[playerIndex];
    this._players[playerIndex] = {
      ...previousPlayerRecord,
      ...playerInfo,
    };
  }

  setIndividualResult(
    sectonName: SectionName,
    roundNumber: number,
    boardNumber: number,
    result: [number, number]
  ): void {
    this._results?.map((section) => {
      if (section.section === sectonName) {
        section.scores.map((score) => {
          if (score.round === roundNumber) {
            score.pairResults[boardNumber - 1] = result;
          }
          return score;
        });
      }
      return section;
    });
  }

  setSectionPairings(sectionName: SectionName, pairingList: Pairing[]): void {}

  eventStateToJson(): string {
    const obj = {
      name: this._name,
      meta: this._meta,
      settings: this._settings,
      players: this._players,
      pairings: this._pairings,
      results: this._results,
    };
    return JSON.stringify(obj);
  }

  eventState(): ManagedEvent {
    return { 
      eventId: this._eventId,
      name: this._name,
      meta: this._meta,
      settings: this._settings,
      players: this._players,
      pairings: this._pairings,
      results: this._results,
    }
  }
}

const SixPlayerPairings: Pairing[] = [
  {
    round: 1,
    pairings: [
      [1, 6],
      [2, 5],
      [3, 4],
    ],
  },
  {
    round: 2,
    pairings: [
      [6, 4],
      [5, 3],
      [1, 2],
    ],
  },
  {
    round: 3,
    pairings: [
      [2, 6],
      [3, 1],
      [4, 5],
    ],
  },
  {
    round: 4,
    pairings: [
      [6, 5],
      [1, 4],
      [2, 3],
    ],
  },
  {
    round: 5,
    pairings: [
      [3, 6],
      [4, 2],
      [5, 1],
    ],
  },
];
