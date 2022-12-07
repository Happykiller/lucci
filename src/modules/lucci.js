import datas from '../datas.json' assert { type: "json" };

export class Lucci {

  indicators;
  knowledges;
  levels;
  levelMaxs;
  peopleUpLevel;

  constructor() {
    this.getRealMetric();
  }

  getRealMetric() {
    if(!this.indicators) {
      this.indicators = {};
    } else {
      return this.indicators;
    }

    for (let knowledge of this.getKnowledges()) {
      this.indicators[knowledge] = {
        prio: datas.projet.knowledgePrio[knowledge],
        peopleUpLevel: 0,
        peoples: 0,
        level: 0,
        levelAve: 0,
        levelMax: 0,
        referent: '',
        students: []
      }
    }

    for (let people in datas.peoples) {
      if(datas.peoples[people].active) {
        const skills = datas.peoples[people].knowledge;
        for (let skill in skills) {
          if(skills[skill].skill > 0) {
            if(this.indicators[skill].level >= datas.projet.level) {
              this.indicators[skill].peopleUpLevel++;
            }
            this.indicators[skill].peoples++;
            this.indicators[skill].level += skills[skill].skill;
            this.indicators[skill].levelAve = Math.round(this.indicators[skill].level / this.indicators[skill].peoples * 100) /100;
            if((skills[skill].skill > this.indicators[skill].levelMax) && (skills[skill].teach)) {
              this.indicators[skill].referent = people;
            }
            if(skills[skill].skill > this.indicators[skill].levelMax) {
              this.indicators[skill].levelMax = skills[skill].skill;
            }
            if((this.indicators[skill].referent !== people) && (skills[skill].learn)) {
              this.indicators[skill].students.push(people);
            }
          }
        }
      }
    }
  }

  getKnowledges() {
    if(!this.knowledges) {
      this.knowledges = [];
    } else {
      return this.knowledges;
    }

    for (let knowledge in datas.projet.knowledgePrio) {
      this.knowledges.push(knowledge);
    }

    return this.knowledges.sort();
  }

  getLevels() {
    if(!this.levels) {
      this.levels = [];
    } else {
      return this.levels;
    }

    for (let indicator in this.indicators) {
      this.levels.push(this.indicators[indicator].levelAve);
    }

    return this.levels;
  }

  getLevelMaxs() {
    if(!this.levelMaxs) {
      this.levelMaxs = [];
    } else {
      return this.levelMaxs;
    }

    for (let indicator in this.indicators) {
      this.levelMaxs.push(this.indicators[indicator].levelMax);
    }

    return this.levelMaxs;
  }

  getPeoples() {
    if(!this.peopleUpLevel) {
      this.peopleUpLevel = [];
    } else {
      return this.peopleUpLevel;
    }

    for (let indicator in this.indicators) {
      this.peopleUpLevel.push(this.indicators[indicator].peopleUpLevel);
    }

    return this.peopleUpLevel;
  }
}