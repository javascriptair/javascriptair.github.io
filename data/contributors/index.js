const contributors = [
  {
    name: 'Alex Booker',
    twitter: 'bookercodes',
    contributions: 'Site Redesign',
  },
  {
    name: 'Connor Elsea',
    twitter: 'Connorelsea_',
    contributions: 'Site Redesign',
  },
  {
    name: 'Adam Wolf',
    twitter: 'adamjwolf',
    contributions: 'SVG logo',
  },
  {
    name: 'Juan Soto',
    twitter: '_hooan',
    contributions: 'Site PRs',
  },
  {
    name: 'Vaibhav',
    twitter: 'da_vaibhav',
    contributions: 'Site PRs',
  },
  {
    name: 'Antti Kupila',
    twitter: 'akupila',
    contributions: 'Automation',
  },
  {
    name: 'Juan Pablo Osorio Ospina',
    twitter: 'jpoo90',
    contributions: 'Automation',
  },
].map(c => {
  return {
    imgSrc: `/data/contributors/${c.twitter}.png`,
    link: `https://twitter.com/${c.twitter}`,
    ...c,
  }
})

export default contributors
