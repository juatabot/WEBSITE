import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';

const TITLE = <h1>JUATABOT</h1>;

function Menu() {
  return (
    <div class="menuColumn">
      {TITLE}
      <div class="pages">
        <Page link="memories" to="/memories"></Page>
        <Page link="about" too="/about"></Page>
      </div>
      <div class="contactInfo">
        <ContactLink link="instagram.com/juatabot"></ContactLink>
        <MailToLink link="tan.hen@husky.neu.edu"></MailToLink>
      </div>
    </div>
  )
}

function Page(props) {
  return (
    <Link to={props.to} href={props.link} class="link">{props.link}</Link>
  )
}

function ContactLink(props) {
  const url = "https://" + props.link;
  return (
    <a href={url} target="_blank" class="link">{props.link}</a>
  )
}

function MailToLink(props) {
  const mailto = "mailto: " + props.link;
  return (
    <a href={mailto} target="_blank" class="link">{props.link}</a>
  )
}

export default Menu;
