import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoSrc from "../../assets/images/weclass_logo.png";

const RECOMMEND = [
  { id: 1, subTitle: "주식", subLink: "/products/" },
  { id: 2, subTitle: "부동산", subLink: "/products/" },
  { id: 3, subTitle: "경제", subLink: "/products/" },
  { id: 4, subTitle: "운동", subLink: "/products/" },
  { id: 5, subTitle: "취미", subLink: "/products/" },
  { id: 6, subTitle: "리액트", subLink: "/products/" },
  { id: 7, subTitle: "파이썬", subLink: "/products/" },
  { id: 8, subTitle: "장고", subLink: "/products/" },
  { id: 9, subTitle: "자취용", subLink: "/products/" },
  { id: 10, subTitle: "손님용", subLink: "/products/" },
  { id: 11, subTitle: "회사꿀팁", subLink: "/products/" },
  { id: 12, subTitle: "악기", subLink: "/products/" },
];

function Recommend() {
  const [checkedItems, setCheckedItems] = useState([]);

  function checkHandler(checked, item) {
    if (checked) {
      setCheckedItems([...checkedItems, item]);
    } else if (!checked) {
      setCheckedItems(checkedItems.filter(element => element !== item));
    }
  }
  console.log(checkedItems);

  return (
    <Wrapper>
      <StickyNav>
        <Logo src={logoSrc} />
      </StickyNav>
      <Section>
        <Title logo>💘</Title>
        <Title>가장 관심있었던 분야를 선택한다면?</Title>
        <Title sub>딱 3개만 골라보세요</Title>
        <Article>
          {RECOMMEND && (
            <>
              {RECOMMEND.map(title => (
                <SubTitle
                  key={title.id}
                  onChange={e => {
                    checkHandler(e.target.checked, e.target.value);
                  }}
                >
                  {title.subTitle}
                  <label id={title.id} onChange={e => checkHandler(e)}>
                    <input type="checkbox" value={title.subTitle} />
                  </label>
                </SubTitle>
              ))}
            </>
          )}
        </Article>
        <StickyBottom>
          <Button>
            <LinkNext to="/">
              <span>다음에 할게요</span>
            </LinkNext>
          </Button>
          <Button orange>
            <span>다음</span>
          </Button>
        </StickyBottom>
      </Section>
    </Wrapper>
  );
}

export default Recommend;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
  flex-direction: column;
`;
const StickyNav = styled.div`
  margin-bottom: 100px;
  width: 100%;
  padding: 24px 15%;
  border-bottom: 1px solid gray;
`;

const Logo = styled.img`
  height: 24px;
`;

const StickyBottom = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  margin-top: 100px;
  width: 100%;
  padding: 12px;
  border-top: 1px solid rgb(248, 248, 248);
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  padding: 0px 16px;
  height: 40px;
  transition: background-color 0.1s ease 0s;
  text-decoration-line: none;
  margin: 0 10px;
  border-radius: 3px;
  color: ${({ orange }) => (orange ? "white" : "black")};
  background-color: ${({ orange }) =>
    orange ? " rgb(255, 86, 0);" : "rgb(248, 248, 248);"};
  border: none;
  justify-content: center;
  align-items: center;
`;

const LinkNext = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Section = styled.div`
  padding: 112px 24px;
  width: 624px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: ${({ sub }) => (sub ? "14px" : "24px")};
  font-weight: ${({ sub }) => (sub ? "normal" : "bold")};
  color: ${({ sub }) => (sub ? "rgb(162, 162, 162);" : "rgb(26, 26, 26);")};
  line-height: 34px;
  letter-spacing: -0.4px;
  margin: 0px;
`;

const Article = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  letter-spacing: -0.15px;
  margin: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 14px 0px 16px;
  height: 44px;
  line-height: 44px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid rgb(248, 248, 248);
  color: rgb(26, 26, 26);
`;
