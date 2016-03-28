import React, {PropTypes} from 'react'

import Page from '../../components/page.js'
import Person from '../../components/person'
import HeaderBar from '../../components/header'

export default ContributorsPage

function ContributorsPage({sponsors, contributors, panelists, host}) {
  return (
    <Page
      title="JavaScript Air Contributors"
    >

      <HeaderBar />

      <div className="container contributors-page">

        <div>
          <h3>Financial contributors</h3>
          <Contributors contributors={sponsors} />
        </div>
        
        <hr />

        <div>
          <h3>Non-financial contributors</h3>
          <Contributors contributors={[host, ...panelists, ...contributors]} />
        </div>

        <hr />

        <div className="contributors-page__links">
          <p>
            If you or your company is interested in contributing financially,
            please see <a href="http://jsair.io/sponsor-info">this document</a>.
          </p>
          <p>
            If you're interested in contributing non-financially,
            feel free to peruse <a href="https://github.com/javascriptair/site">the github repo</a>.
          </p>
        </div>

      </div>
    </Page>
  )
}

function Contributors({contributors}) {
  return (
    <div className="person-group">
      {contributors.map((person, index) => (
        <div key={index} className="contributors-page__contributor">
          <Person {...person} />
          {person.contributions}
        </div>
      ))}
    </div>
  )
}

ContributorsPage.propTypes = {
  sponsors: PropTypes.array.isRequired,
  contributors: PropTypes.array.isRequired,
  panelists: PropTypes.array.isRequired,
  host: PropTypes.object.isRequired,
}


