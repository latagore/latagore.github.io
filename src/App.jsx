import React, {Component} from 'react';
import SkillGraph from './components/SkillGraph.jsx'
const Header = ({data}) => {
  return (
    <header>
      <h1>{data.contact.name}</h1>
      <h2 className="job-title">{data.contact.title}</h2>
    </header>
  )
}

const Info = ({data, highlightedSkills}) => {
  if (data.description) {
    return (
      <div className="info-bullet">
        <p dangerouslySetInnerHTML={{__html: data.description}} />
        <ul className="skill-list">
          {data.skills && data.skills.map(
            (skill, i) => {
              let className = "text";
              if (highlightedSkills.has(skill)) {
                className += " highlighted";
              }
              return <li key={i}><span className={className}>{skill}</span></li>
            }
          )}
        </ul>
      </div>
    )
  } else {
    return <div dangerouslySetInnerHTML={{__html: data}} />
  }
}

const Aside = ({data, onSkillHighlight}) => {
  const c = data.contact;
  return (
    <aside className="aside">
      <div className="contact">
        <div className="email"><a href={`mailto:${c.email}`}>{c.email}</a></div>
        <div className="phone"><a href={`tel:${c.phone}`}>{c.phone}</a></div>
        <div className="address"><a href="https://goo.gl/maps/7hTSM4Ln3Wx">{c.address}</a></div>
        <div className="github"><a href={`https://github.com/${c.github}`}>{c.github}</a></div>
        <div className="website"><a href={`https://${c.website}`}>{c.website}</a></div>
        <div className="linkedin"><a href={`https://www.linkedin.com/in/${c.linkedin}`}>{c.linkedin}</a></div>
      </div>
      <p className="summary" dangerouslySetInnerHTML={{__html: data.summary}} />
    </aside>
  )
}


const Experience = ({data, highlightedSkills}) => {
  return (
    <div className="info-block">
      <h3 className="heading">{data.title} &mdash; {data.organization}</h3>
      <div className="location">{data.location}</div>
      <div className="date">{data.startDate} to {data.endDate}</div>
      {data.info &&
        <ul className="info">
        {
          data.info.map((info, key) => <li key={key}><Info data={info} highlightedSkills={highlightedSkills} /></li>)
        }
        </ul>
      }
    </div>
  );
}

const Education = ({data, highlightedSkills}) => {
  return (
    <div className="info-block">
      <h3 className="heading">{data.title} &mdash; {data.organization}</h3>
      <div className="location">{data.location}</div>
      <div className="date">{data.startDate} to {data.endDate}</div>
      {(data.info || data.gpa) &&
        <ul className="info">
          {
            data.gpa && <li>Overall GPA: {data.gpa.overall} out of {data.gpa.max}. Major GPA: {data.gpa.major} out of {data.gpa.max}</li>
          }
          {
            data.info && data.info.map((info, key) => <li key={key}><Info data={info} highlightedSkills={highlightedSkills} /></li>)
          }
        </ul>
      }
    </div>
  );
}

const Achievement = ({data, highlightedSkills}) => {
  return (
    <li>
      <h3>{data.title}</h3>
      <Info data={data} highlightedSkills={highlightedSkills} />
    </li>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      highlightedSkills: new Set()
    };
  }

  _onSkillHighlightToggle = (skill) => {
    this.setState((state) => {
      if (state.highlightedSkills.has(skill)) {
        state.highlightedSkills.delete(skill);
      } else {
        state.highlightedSkills.add(skill)
      }
      return state;
    })
  }

  render() {
    return (
      <div className="resume">
        <Header data={this.props.data} />
        <Aside data={this.props.data} />
        <main>
          <section className="experience">
            <h2>Experience</h2>
            {this.props.data.experience.map((data, key) => <Experience data={data} key={key} highlightedSkills={this.state.highlightedSkills} />)}
          </section>
          <section className="skills">
            <h2>Skills</h2>
            <SkillGraph skills={this.props.data.skills} onSkillHighlightToggle={this._onSkillHighlightToggle}/>
          </section>
          <section className="education">
            <h2>Education</h2>
            {this.props.data.education.map((data, key) => <Education data={data} key={key} highlightedSkills={this.state.highlightedSkills} />)}
          </section>
          <section className="achievements">
            <h2>Projects</h2>
            <ul>
              {this.props.data.achievements.map((data, key) => <Achievement data={data} key={key} highlightedSkills={this.state.highlightedSkills}/>)}
            </ul>
          </section>
        </main>
      </div>
    );
  }
}
export default App;
