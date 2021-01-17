import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fonts, colors, dimensions } from "../defaultStyles";
import nav_logo from "../images/mtnside-logo-white.png";

const Wrapper = styled.div`
  position: sticky;
  background-color: ${colors.background};
  top: 0;
  z-index: 999;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: ${dimensions.navHeight};
  padding: 20px;
  width: 100%;
`;

const LeftContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;
const RightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const NavLogo = styled.img`
  display: flex;
  height: 85%;
  width: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 200px;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const NavLinkWrapper = styled.div`
  & > a {
    text-decoration: none;
    text-transform: uppercase;
    font-family: ${fonts.primaryFont};
    margin-left: 20px;
    padding: 6px 12px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: ${colors.textPrimary};
    background-color: ${({ active }) =>
      active ? colors.lightBlue : "transparent"};
    transition: 0.2s background-color, 0.2s color, 0.2s border;
    &:hover {
      opacity: 1;
      border: 1px solid ${colors.lightBlue};
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 520px) {
      font-size: 0.8rem;
    }
    @media (max-width: 470px) {
      font-size: 0.65rem;
    }
  }
`;

const NavLink = ({ to, children }) => {
  let match = useRouteMatch({
    path: to,
    exact: true,
  });
  return (
    <NavLinkWrapper active={match}>
      <Link to={to}>{children}</Link>
    </NavLinkWrapper>
  );
};

const Navbar = () => {
  return (
    <Wrapper>
      <LeftContainer>
        <NavLogo src={nav_logo} />
      </LeftContainer>
      <RightContainer>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/rooms"}>Study Rooms</NavLink>
        <NavLink to={"/team"}>Team</NavLink>
      </RightContainer>
    </Wrapper>
  );
};

export default Navbar;
