import React, { useEffect, useState } from "react";
import styled from "styled-components";
import List from "./List/List";
import { config } from "../../../config";

function DropDown() {
  const [isHover, setIsHover] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  function menuMouseIn() {
    setIsHover(true);
  }

  function menuMouseOut() {
    setIsHover(false);
  }

  useEffect(() => {
    fetch(config.nav)
      .then(res => res.json())
      .then(data => setCategoryData(data.result));
  }, []);

  return (
    <Wrapper>
      <Container>
        <Lists>
          {categoryData.map(content => (
            <List
              menuMouseIn={menuMouseIn}
              menuMouseOut={menuMouseOut}
              content={content}
              isHover={isHover}
              key={content.id}
            />
          ))}
        </Lists>
      </Container>
    </Wrapper>
  );
}

export default DropDown;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;

const Container = styled.div`
  width: 1176px;
  justify-content: center;
`;

const Lists = styled.ul`
  display: flex;
  padding-top: 10px;
`;
