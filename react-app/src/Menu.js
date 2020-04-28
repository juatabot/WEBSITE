import React from 'react';
import './Menu.css';

const TITLE = <h1>JUATABOT</h1>;

function Menu() {
  return (
    <div class="menuColumn">
      {TITLE}
      <div class="pages">
        <Page link="memories"></Page>
        <Page link="about"></Page>
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
    <a href={props.link} class="link">{props.link}</a>
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
