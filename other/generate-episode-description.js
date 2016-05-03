/* eslint react/prop-types: 0 */
import ReactDOMServer from 'react-dom/server'

import {copy} from 'copy-paste'
import marked from 'marked'
import deindent from 'deindent'

import {getSponsorsForDate} from '../sponsors'

import * as utils from '<utils>/utils'
import episodeList from './utils/episode-list'
import inquirer from 'inquirer'

inquirer.prompt([
  episodeList,
]).then(({episode}) => {
  const showSponsors = getSponsorsForDate(episode.date)

  const string = ReactDOMServer.renderToStaticMarkup(
    <EpisodeDescription
      episode={episode}
      sponsors={showSponsors}
    />
  )

  copy(string, err => {
    if (err) {
      throw err
    }
    console.log(`Podcast description for "${episode.title}" copied to your clipboard`)
  })
})


function EpisodeDescription({episode, sponsors}) {
  const {
    date,
    titleHTML,
    descriptionHTML,
    guests,
    host,
    panelists,
  } = episode
  const panelistsAndHost = utils.sortPeople([...panelists, host])
  const showAttendees = [...utils.sortPeople(guests), ...panelistsAndHost]
  const combinedSponsors = [sponsors.premierSponsor, ...sponsors.goldSponsors, ...sponsors.silverSponsors]
  return (
    <div>
      <div>
        <Title
          date={date}
          titleHTML={titleHTML}
          guests={guests}
        />
      </div>

      <div>
        <strong>Description:</strong>
        <span dangerouslySetInnerHTML={descriptionHTML} />
      </div>

      <div>
        <strong>Show sponsors:</strong>
        <ul>
          {
            combinedSponsors.map(({name, link, tagline}, i) => (
              <li key={i}>
                <a href={link}>{name}</a> - {tagline}
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <strong>Links, Picks, and Tips:</strong>
        {
          showAttendees.map((a, i) => <LinksPicksTips key={i} person={a} />)
        }
      </div>

      <div>
        <strong>About JavaScript Air:</strong>
        <div>
          <ShowDescription />
        </div>
      </div>

    </div>
  )
}

function Title({date, titleHTML, guests}) {
  return (
    <span>
      <a href={`http://javascriptair.com/episodes/${date}`} dangerouslySetInnerHTML={titleHTML} />
      {' with '}
      <People people={guests} />
    </span>
  )
}

function LinksPicksTips({person}) {
  const {links, tips, picks} = person
  const nothing = !links.length && !tips.length && !picks.length
  const notesSections = [
    {label: 'Links', notes: links},
    {label: 'Tips', notes: tips},
    {label: 'Picks', notes: picks},
  ]

  return (
    <div>
      <Person name={person.name} twitter={person.twitter} />
      {nothing ? ': No links, tips, or picks this week' : ''}
      <ul>
        {
          notesSections.map((section, index) => {
            if (!section.notes.length) {
              return ''
            }
            return (
              <li key={index}>
                {`${section.label}: `}
                <Markdown>
                  {utils.displayListify(section.notes).join('')}
                </Markdown>
              </li>
            )
          })
        }
      </ul>
    </div>
  )

}

function Person({twitter, name}) {
  return <a href={`https://twitter.com/${twitter}`}>{name}</a>
}

function People({people}) {
  return (
    <span>
      {
        utils.displayListify(
          people.map(({twitter, name}, i) => (
            <Person
              key={i}
              twitter={twitter}
              name={name}
            />
          ))
        )
      }
    </span>
  )
}

function ShowDescription() {
  return (
    <Markdown>
      [JavaScriptAir](http://javascriptair.com) is the live broadcast podcast
      all about JavaScript hosted by
      [egghead.io instructor](https://egghead.io/instructors/kentcdodds)
      [Kent C. Dodds](https://twitter.com/kentcdodds).
      Please visit the JavaScript Air website
      ([javascriptair.com](http://javascriptair.com))
      to see upcoming and past episodes.
      Go to [suggest.jsair.io](http://suggest.jsair.io) to
      suggest topics and guests for the show.
      Go to [feedback.jsair.io](http://feedback.jsair.io) to
      provide feedback on this and other episodes.
      Also be sure to follow JavaScript Air on
      [Twitter](https://twitter.com/JavaScriptAir)
      and [Google+](https://plus.google.com/105493143005968326308)
      to stay up to date with future episodes.
      Also, all episodes are on the
      [YouTube](http://video.javascriptair.com) channel as well.
    </Markdown>
  )
}

function Markdown({children}) {
  let html = marked(deindent(children))
  // get rid of <p> and </p>
  html = html.substring(3, html.length - 5)
  return <span dangerouslySetInnerHTML={({__html: html})} />
}
