const isStellar = ({ params }) => params.Stellar === true
const hasHuacai = ({ params }) => params.Huacai === true
const getHuacaiStacks = ({ cons }) => cons >= 1 ? 6 : 4

const stellarBonus = value => ({
  stellarConduct: value,
  stellarSwirl: value
})

const stellarDmg = ({ attr, calc }, { basic }, multiplier, reaction) => {
  return basic(calc(attr.atk) * multiplier / 100, '', reaction)
}

export const details = [{
  title: '二段E星超导伤害',
  params: { Huacai: true, Stellar: true },
  dmg: (data, dmg) => stellarDmg(data, dmg, data.talent.e['破晓终奏星超导/星扩散伤害'][0], 'stellarConduct')
}, {
  title: '二段E星扩散伤害',
  params: { Huacai: true, Stellar: true },
  dmg: (data, dmg) => stellarDmg(data, dmg, data.talent.e['破晓终奏星超导/星扩散伤害'][1], 'stellarSwirl')
}, {
  title: 'Q斩击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q')
}, {
  title: 'Q最终段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击最终段伤害'], 'q')
}]

export const defDmgIdx = 0
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [{
  check: ds => hasHuacai(ds),
  cons: 2,
  title: '奥黛塔2命：满层华彩使攻击力提升[atkPct]%',
  data: {
    atkPct: ds => getHuacaiStacks(ds) * 7
  }
}, {
  check: ds => hasHuacai(ds) && isStellar(ds),
  cons: 2,
  title: '奥黛塔2命：辉映·星烁状态下，独舞倒影附近敌人的对应元素抗性降低[kx]%',
  data: {
    kx: 20
  }
}, {
  check: ds => isStellar(ds),
  title: '奥黛塔天赋：基于攻击力提升队伍中角色造成的星烁反应基础伤害[fypct]%',
  sort: 9,
  data: {
    fypct: ({ attr, calc }) => Math.min(calc(attr.atk) / 100 * 0.7, 14)
  }
}, {
  check: ds => hasHuacai(ds) && isStellar(ds),
  title: '奥黛塔天赋：满层华彩使星烁反应伤害提升[stellarConduct]%',
  sort: 9,
  data: stellarBonus(ds => getHuacaiStacks(ds) * 15)
}, {
  check: ds => isStellar(ds),
  title: '奥黛塔天赋：攻击力超过1000点的部分使自身星烁反应额外造成原本[multi]%的伤害',
  sort: 9,
  data: {
    multi: ({ attr, calc }) => Math.min(Math.max((calc(attr.atk) - 1000) / 100 * 1.5, 0), 30)
  }
}, {
  check: ds => hasHuacai(ds) && isStellar(ds),
  cons: 6,
  title: '奥黛塔6命：华彩影响下，奥黛塔自身星烁反应伤害擢升[elevated]%',
  data: {
    elevated: 45
  }
}]

export const createdBy = 'mohen-ink'
