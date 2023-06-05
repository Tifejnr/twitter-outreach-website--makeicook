import React from 'react'

export default function Main() {
  return (
        <main id="hidecontents">
                <article id="member-name">
                  <form id="survey-form">
                    <label>
                        Trello-name:
                        <input type="text" placeholder="Trello-name of Member"/>

                    </label>
                  </form>
                </article>

                <section>
                  <h1 id="signin"> Select Workspaces To Delete Member From</h1>
                  <article>
                     <input id="search" type="text" placeholder="Search Workspace..." />
                  </article>

                </section>
        </main>
  )
}
