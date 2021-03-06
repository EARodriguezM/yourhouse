import React from 'react';
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai';
import { StyledFooter, Text, Social, SocialList } from './styled';

const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <Text>Made by Esteban A. Rodríguez Meléndez</Text>
      <Text> Follow me on </Text>
      <Social>
        <SocialList>
          <a
            href="https://github.com/EARodriguezM"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
        </SocialList>
        <SocialList>
          <a
            href="https://twitter.com/EARodriguezM"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter />
          </a>
        </SocialList>
        <SocialList>
          <a
            href="https://www.linkedin.com/in/earodriguezmelendez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineLinkedin />
          </a>
        </SocialList>
      </Social>
    </StyledFooter>
  );
};

export default Footer;
